package com.zooflix.be_zooflix.domain.predict.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zooflix.be_zooflix.domain.alarm.entity.AlarmTypeStatus;
import com.zooflix.be_zooflix.domain.alarm.service.AlarmService;
import com.zooflix.be_zooflix.domain.predict.dto.PredictRankDto;
import com.zooflix.be_zooflix.domain.predict.dto.PredictReqDto;

import com.zooflix.be_zooflix.domain.predict.dto.PredictResDto;
import com.zooflix.be_zooflix.domain.predict.dto.StockHistoryDto;
import com.zooflix.be_zooflix.domain.predict.entity.Predict;
import com.zooflix.be_zooflix.domain.predict.entity.StockList;
import com.zooflix.be_zooflix.domain.predict.repository.PredictRepository;

import com.zooflix.be_zooflix.domain.predict.repository.StockListRepository;
import com.zooflix.be_zooflix.domain.stockSubscribe.dto.StockSubscribeDto;
import com.zooflix.be_zooflix.domain.user.dto.UserKeyProjection;
import com.zooflix.be_zooflix.domain.user.entity.User;
import com.zooflix.be_zooflix.domain.user.repository.UserRepository;
import com.zooflix.be_zooflix.domain.userSubscribe.entity.UserSubscribe;
import com.zooflix.be_zooflix.domain.userSubscribe.repository.UserSubscribeRepository;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.Sort;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class PredictService {

    private final PredictRepository predictRepository;
    private final UserRepository userRepository;
    private final AlarmService alarmService;
    private final UserSubscribeRepository userSubscribeRepository;
    private final StockListRepository stockListRepository;


    @Autowired
    public PredictService(PredictRepository predictRepository, UserRepository userRepository, AlarmService alarmService, UserSubscribeRepository userSubscribeRepository, StockListRepository stockListRepository) {
        this.predictRepository = predictRepository;
        this.userRepository = userRepository;
        this.alarmService = alarmService;
        this.userSubscribeRepository = userSubscribeRepository;
        this.stockListRepository = stockListRepository;
    }

    //전체 예측 목록 조회
    public List<PredictResDto> getPredicts() {
        List<Predict> predicts = predictRepository.findAll(Sort.by(Sort.Direction.DESC, "createDate"));
        return predicts.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<PredictResDto> getSortedPredicts() {
        List<Predict> predicts = predictRepository.findByAllOrderByUserTem();
        return predicts.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<PredictResDto> getEndPredicts() {
        List<Predict> predicts = predictRepository.findEndPredict();
        return predicts.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    //종목명 검색
    public List<PredictResDto> getPredictsByStockName(String stockName) {
        List<Predict> predicts = predictRepository.findByStockNameOrderByCreateDateDesc(stockName);
        return predicts.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<PredictResDto> getSortedPredictsByStockName(String stockName) {
        List<Predict> predicts = predictRepository.findByStockNameOrderByUserTem(stockName);
        return predicts.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<PredictResDto> getEndPredictsByStockName(String stockName) {
        List<Predict> predicts = predictRepository.findEndPredictByStockName(stockName);
        return predicts.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }


    //예측 글 작성
    public PredictResDto postPredict(PredictReqDto dto) {
        Predict predict = Predict.builder()
                .stockName(dto.getStockName())
                .user(userRepository.findMyInfo(dto.getUserNo()))
                .createDate(LocalDateTime.now())
                .pdDate(dto.getPdDate())
                .pdValue(dto.getPdValue())
                .pdContent(dto.getPdContent())
                .preValue(dto.getPreValue())
                .pdUpDown(dto.isPdUpDown())
                .build();


        //나를 구독한 사람들을 조회
        List<UserSubscribe> subscribers = userSubscribeRepository.findSubscribeToMe(dto.getUserNo());

        String content = userRepository.findMyInfo(dto.getUserNo()).getUserName() + "님의 새로운 예측 글이 작성되었습니다.";
        // 그 사람들에게 알림 send
        for (UserSubscribe subscriber : subscribers) {
            User subscriberUser = subscriber.getUser();
            alarmService.send(subscriberUser, content, AlarmTypeStatus.WRITE);
        }

        return toDto(predictRepository.save(predict));
    }

    //이미 예측중인게 있으면 글작성불가
    public boolean checkPredict(int userNo, String stockName) {
        return predictRepository.findStockNameNoResult(userNo, stockName);
    }

    //종가 업데이트
    @Scheduled(cron = "0 30 15 ? * MON-FRI")
    public void postNxtValue() {
        LocalDate today = LocalDate.now();
        List<Predict> todayPredictions = predictRepository.findByPdDate(today);
        for (Predict prediction : todayPredictions) {
            int nxtValue = getClosingPrice(prediction.getStockName(), prediction.getPdDate().toString());
            prediction.setNxtValue(nxtValue);
            predictRepository.save(prediction);
        }

    }

    //예측 글 성공여부 업데이트
    @Scheduled(cron = "30 30 15 ? * MON-FRI")
    public void postPredictResult() {
        LocalDate today = LocalDate.now();
        List<Predict> todayPredictions = predictRepository.findByPdDate(today);
        for (Predict prediction : todayPredictions) {
            if (isSuccessful(prediction)) {
                prediction.setPdResult("성공");
                alarmService.send(prediction.getUser(), "예측이 성공했습니다", AlarmTypeStatus.RESULT);
            } else {
                prediction.setPdResult("실패");
                alarmService.send(prediction.getUser(), "예측이 실패했습니다.", AlarmTypeStatus.RESULT);
            }
            predictRepository.save(prediction);
        }

    }

    private boolean isSuccessful(Predict prediction) {
        int pdValue = prediction.getPdValue();
        int nxtValue = prediction.getNxtValue();
        double differencePercentage = Math.abs((nxtValue - pdValue) / (double) pdValue);
        return differencePercentage <= 0.01; // 1% 내외
    }

    //예측 글 삭제
    public void deletePredict(int pdNo) {
        predictRepository.deleteById(pdNo);
    }

    public PredictResDto toDto(Predict predict) {
        return PredictResDto.builder()
                .pdNo(predict.getPdNo())
                .stockName(predict.getStockName())
                .userNo(predict.getUser().getUserNo())
                .userName(predict.getUser().getUserName())
                .userTem(predict.getUser().getUserTemperature())
                .createDate(predict.getCreateDate())
                .pdDate(predict.getPdDate())
                .pdValue(predict.getPdValue())
                .pdContent(predict.getPdContent())
                .pdResult(predict.getPdResult())
                .preValue(predict.getPreValue())
                .nxtValue(predict.getNxtValue())
                .pdUpDown(predict.isPdUpDown())
                .build();
    }

    public PredictRankDto getZoostra() {
        int userNo = predictRepository.findZoostra();
            String name = predictRepository.findUserNameByUserNo(userNo);
            String zbti = predictRepository.findUserZbtiByUserNo(userNo);
            PredictRankDto rank = new PredictRankDto(userNo, name, zbti);
            return rank;
    }

    public PredictRankDto getZoostraByStockName(String stockName) {
        String no = predictRepository.findZoostraByStockName(stockName);
        System.out.println("userNo1: "+no);
        if (no != null) {
            int userNo = Integer.parseInt(no);
            String name = predictRepository.findUserNameByUserNo(userNo);
            String zbti = predictRepository.findUserZbtiByUserNo(userNo);
            PredictRankDto rank = new PredictRankDto(userNo, name, zbti);
            return rank;
        } else {
            PredictRankDto rank = new PredictRankDto();
            return rank;
        }
    }

    @Value("http://127.0.0.1:8000/get_closing_price")
    private String pythonPredictValue;

    @Value("http://127.0.0.1:8000/generate_stock_graph")
    private String pythonGraph;

    @Value("http://127.0.0.1:8000/compare_graph")
    private String pythonCompareGraph;

    @Value("http://127.0.0.1:8000/get_stock_search")
    private String pythonStockSearch;

    @Value("http://127.0.0.1:8000/get_now_price")
    private String pythonNowPrice;

    public int getClosingPrice(String stockName, String date) {
        RestTemplate restTemplate = new RestTemplate();
        String code = stockListRepository.findStockCode(stockName);
        String url = pythonPredictValue + "?stock_code=" + code + "&date=" + date;

        Double closingPrice = restTemplate.getForObject(url, Double.class);

        return closingPrice.intValue();
    }

    public String getGraph(String stockName) {
        if(stockName == null) return null;
        String date = String.valueOf(LocalDate.now());
        String code = stockListRepository.findStockCode(stockName);
        // 쿼리 문자열로 요청 데이터 구성
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(pythonGraph)
                .queryParam("stock_code", code)
                .queryParam("stock_name", stockName)
                .queryParam("date", date);
        return builder.toUriString();
    }

    public String getCompareGraph(int userNo, String stockName) {
        String date = String.valueOf(LocalDate.now());
        List<String> dateList = predictRepository.findPdDateByUserNo(userNo, stockName);
        List<String> valueList = predictRepository.findPdValueByUserNo(userNo, stockName);
        List<String> resultList = predictRepository.findPdResultByUserNo(userNo, stockName);
        if (resultList.isEmpty()) {
            return getGraph(stockName);
        }
        List<Float> valueListF = new ArrayList<>();
        for (String valueString : valueList) {
            Float value = Float.parseFloat(valueString);
            valueListF.add(value);
        }
        String code = stockListRepository.findStockCode(stockName);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(pythonCompareGraph)
                .queryParam("stock_code", code)
                .queryParam("stock_name", stockName)
                .queryParam("date", date)
                .queryParam("predict_dates", dateList)
                .queryParam("predict_costs", valueListF)
                .queryParam("predict_results", resultList);
        return builder.toUriString();
    }

    public List<String> getStockSearch(String stockName) {
        List<String> list = stockListRepository.findStockListByStockName(stockName);
        return list;
    }

    public Float getNowPrice(String stockName) {
        RestTemplate restTemplate = new RestTemplate();
        String code = stockListRepository.findStockCode(stockName);
        String url = pythonNowPrice + "?stock_code=" + code;
        Float result = restTemplate.getForObject(url, Float.class);

        return result;
    }

    public List<StockHistoryDto> getStockHistory(int userNo) throws IOException {
        UserKeyProjection userInfo = userRepository.findByUserNo(userNo);
        List<StockHistoryDto> historyDtoList = new ArrayList<>();
        if(userInfo == null){
            return historyDtoList;
        }
        if (userInfo.getUserAppKey() == null || userInfo.getUserSecretKey() == null || userInfo.getUserAccount() == null) {
            return historyDtoList;
        }

        //액세스토큰 확인
        String TOKEN = "";
        if (userInfo.getUserToken() != null) { //토큰이 있다면
            Duration duration = Duration.between(userInfo.getUserTokenDate(), LocalDateTime.now());
            if (duration.toHours() < 24) {
                TOKEN = userInfo.getUserToken(); //24시간 이내면 저장된 토큰 가져오기
            } else {
                TOKEN = getAccessToken(userNo); //24시간이 지났다면 새로 발급
            }
        } else {
            TOKEN = getAccessToken(userNo); //토큰이 없다면 새로 발급;
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        LocalDate today = LocalDate.now();
        String formattedDate = today.format(formatter);
        LocalDate thirtyDaysAgo = today.minusDays(30);
        String formattedAgoDate = thirtyDaysAgo.format(formatter);
        String baseUrl = "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/trading/inquire-daily-ccld";

        String queryParameters = String.format("?CANO=%s&ACNT_PRDT_CD=%s&INQR_STRT_DT=%s&INQR_END_DT=%s&SLL_BUY_DVSN_CD=00&INQR_DVSN=00&PDNO=&CCLD_DVSN=01&ORD_GNO_BRNO=&ODNO=&INQR_DVSN_3=01&INQR_DVSN_1=&CTX_AREA_FK100=&CTX_AREA_NK100=",
                userInfo.getUserAccount().substring(0, 8),
                userInfo.getUserAccount().substring(8),
                formattedAgoDate,
                formattedDate);

        String urlData = baseUrl + queryParameters;
        URL url = null;
        HttpURLConnection conn = null;

        String responseData = "";
        BufferedReader br = null;

        StringBuffer sb = new StringBuffer();
        String returnData = "";

        url = new URL(urlData);
        conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setRequestProperty("Authorization", "Bearer " + TOKEN);
        conn.setRequestProperty("appkey", userInfo.getUserAppKey());
        conn.setRequestProperty("appsecret", userInfo.getUserSecretKey());
        conn.setRequestProperty("tr_id", "TTTC8001R");

        conn.connect();

        br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
        try {
            sb = new StringBuffer();
            while ((responseData = br.readLine()) != null) {
                sb.append(responseData);
            }
            returnData = sb.toString();
            String responseCode = String.valueOf(conn.getResponseCode());

            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(returnData);
            JsonNode output1Node = rootNode.get("output1");
            if (output1Node.isArray() && !output1Node.isNull()) {
                // 각 요소에 대해 반복하면서 출력
                for (JsonNode element : output1Node) {
                    String type = "";
                    if (element.get("sll_buy_dvsn_cd").asText().equals("01")) {
                        type = "매도";
                    } else {
                        type = "매수";
                    }
                    StockHistoryDto dto = StockHistoryDto.builder()
                            .stockDate(element.get("ord_dt").asText())
                            .stockType(type)
                            .stockName(element.get("prdt_name").asText())
                            .stockNum(element.get("ord_qty").asText())
                            .stockCost(element.get("avg_prvs").asText())
                            .build();

                    historyDtoList.add(dto);
                }
            }
            if (br != null) {
                br.close();
            }
        } catch (IOException e) {
            throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
        }

        return historyDtoList;
    }

    public String getAccessToken(int userNo) {
        User userInfo = userRepository.findMyInfo(userNo);
        // HttpClient 인스턴스 생성
        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            // API 엔드포인트 URL
            String accessUrl = "https://openapivts.koreainvestment.com:29443/oauth2/tokenP";

            // POST 요청 생성
            HttpPost httpPost = new HttpPost(accessUrl);

            // 요청 본문 데이터
            String accessData = "{\n" +
                    "    \"grant_type\": \"client_credentials\",\n" +
                    "    \"appkey\": \"" + userInfo.getUserAppKey() + "\",\n" +
                    "    \"appsecret\": \"" + userInfo.getUserSecretKey() + "\"\n" +
                    "}";
            StringEntity requestBody = new StringEntity(accessData);
            httpPost.setEntity(requestBody);
            httpPost.setHeader("Content-type", "application/json");

            // HTTP 요청 보내고 응답 받기
            try (CloseableHttpResponse response = httpClient.execute(httpPost)) {
                // 응답 상태코드 확인
                int statusCode = response.getStatusLine().getStatusCode();

                // 응답 본문 읽기
                HttpEntity entity = response.getEntity();
                if (entity != null) {
                    String responseBody = EntityUtils.toString(entity);
                    ObjectMapper objectMapper = new ObjectMapper();
                    JsonNode jsonNode = objectMapper.readTree(responseBody);
                    userInfo.userUpdateToken(jsonNode.get("access_token").asText(), LocalDateTime.now());
                    userRepository.save(userInfo);
                    return jsonNode.get("access_token").asText();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "fail";
    }

    @Value("http://127.0.0.1:8000/get_stock_list")
    private String pythonStockList;

    public void getStockList() {
        RestTemplate restTemplate = new RestTemplate();

        String url = pythonStockList;

        ResponseEntity<List> responseEntity = restTemplate.getForEntity(url, List.class);
        List<LinkedHashMap<String, String>> list = responseEntity.getBody();
        for (LinkedHashMap<String, String> stockMap : list) {
            String stockName = stockMap.get("Name");
            String stockCode = stockMap.get("Code");

            // 변환된 데이터를 사용하여 StockList 객체 생성 및 저장
            StockList stockList = new StockList();
            stockList.setStockCode(stockCode);
            stockList.setStockName(stockName);
            stockListRepository.save(stockList);
        }
    }

}


