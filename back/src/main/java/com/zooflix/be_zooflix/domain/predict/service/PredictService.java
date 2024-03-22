package com.zooflix.be_zooflix.domain.predict.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zooflix.be_zooflix.domain.predict.dto.PredictReqDto;

import com.zooflix.be_zooflix.domain.predict.dto.PredictResDto;
import com.zooflix.be_zooflix.domain.predict.dto.StockHistoryDto;
import com.zooflix.be_zooflix.domain.predict.entity.Predict;
import com.zooflix.be_zooflix.domain.predict.repository.PredictRepository;

import com.zooflix.be_zooflix.domain.stockSubscribe.dto.StockSubscribeDto;
import com.zooflix.be_zooflix.domain.user.dto.UserKeyProjection;
import com.zooflix.be_zooflix.domain.user.entity.User;
import com.zooflix.be_zooflix.domain.user.repository.UserRepository;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class PredictService {

    private final PredictRepository predictRepository;
    private final UserRepository userRepository;

    @Autowired
    public PredictService(PredictRepository predictRepository, UserRepository userRepository) {
        this.predictRepository = predictRepository;
        this.userRepository = userRepository;
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
        return toDto(predictRepository.save(predict));
    }

    //종가 업데이트
    @Scheduled(cron = "0 30 15 ? * MON-FRI")
    public void postNxtValue() {
        LocalDate today = LocalDate.now();
        List<Predict> todayPredictions = predictRepository.findByPdDate(today);
        for (Predict prediction : todayPredictions) {
            int nxtValue = getClosingPrice(prediction.getStockName(), prediction.getPdDate().toString());
            System.out.println(prediction.getNxtValue());
            prediction.setNxtValue(nxtValue);
            System.out.println(prediction.getNxtValue());
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
            } else {
                prediction.setPdResult("실패");
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

    @Value("http://127.0.0.1:8000/get_closing_price")
    private String pythonPredictValue;

    @Value("http://127.0.0.1:8000/generate_stock_graph")
    private String pythonGraph;

    @Value("http://127.0.0.1:8000/compare_graph")
    private String pythonCompareGraph;

    public int getClosingPrice(String stockName, String date) {
        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("stock_name", stockName);
        requestBody.put("date", String.valueOf(LocalDate.now()));

        String url = pythonPredictValue + "?stock_name=" + stockName + "&date=" + date;

        // GET 요청 보내기
        Double closingPrice = restTemplate.getForObject(url, Double.class);

        System.out.println("closing price: " + closingPrice);
        return closingPrice.intValue();
    }

    public String getGraph(String stockName) {
        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> requestBody = new HashMap<>();
        String date = String.valueOf(LocalDate.now());
        // 쿼리 문자열로 요청 데이터 구성
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(pythonGraph)
                .queryParam("stock_name", stockName)
                .queryParam("date", date);
        return builder.toUriString();
    }

    public String getCompareGraph(int userNo, String stockName) {
        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> requestBody = new HashMap<>();

        String date = String.valueOf(LocalDate.now());
        List<String> dateList = predictRepository.findPdDateByUserNo(userNo);
        List<String> valueList = predictRepository.findPdValueByUserNo(userNo);
        List<Float> valueListF = new ArrayList<>();
        for (String valueString : valueList) {
            Float value = Float.parseFloat(valueString);
            valueListF.add(value);
        }

        // 쿼리 문자열로 요청 데이터 구성
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(pythonCompareGraph)
                .queryParam("stock_name", stockName)
                .queryParam("date", date)
                .queryParam("predict_dates", dateList)
                .queryParam("predict_costs", valueListF);
//        // GET 요청으로 데이터 전송 및 응답 받기
//        ResponseEntity<byte[]> response = restTemplate.exchange(
//                builder.toUriString(), HttpMethod.GET, new HttpEntity<>(headers), byte[].class);
//        byte[] imageBytes = response.getBody();
        return builder.toUriString();
    }

    public List<StockHistoryDto> getStockHistory(int userNo) throws IOException {
        UserKeyProjection userInfo = userRepository.findByUserNo(userNo);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        LocalDate today = LocalDate.now();
        String formattedDate = today.format(formatter);
        LocalDate thirtyDaysAgo = today.minusDays(30);
        String formattedAgoDate = thirtyDaysAgo.format(formatter);
        String baseUrl = "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/trading/inquire-daily-ccld";

        // Building query parameters
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
        List<StockHistoryDto> historyDtoList = new ArrayList<>();
        try {
            url = new URL(urlData);
            conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Authorization", "Bearer " + getAccessToken(userInfo));
            conn.setRequestProperty("appkey", userInfo.getUserAppKey());
            conn.setRequestProperty("appsecret", userInfo.getUserSecretKey());
            conn.setRequestProperty("tr_id", "TTTC8001R");

            conn.connect();

            br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
        } catch (IOException e) {
            br = new BufferedReader(new InputStreamReader(conn.getErrorStream(), "UTF-8"));
        } finally {
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
                if (output1Node.isArray()) {
                    // 각 요소에 대해 반복하면서 출력
                    for (JsonNode element : output1Node) {
//                        System.out.println("output1 요소:");
//                        System.out.println(element.toPrettyString());
                        StockHistoryDto dto = StockHistoryDto.builder()
                                .stockDate(element.get("ord_dt").asText())
                                .stockType(element.get("sll_buy_dvsn_cd").asText())
                                .stockName(element.get("prdt_name").asText())
                                .stockNum(element.get("ord_qty").asText())
                                .stockCost(element.get("avg_prvs").asText())
                                .build();

                        historyDtoList.add(dto);
                    }
                } else {
                    System.out.println("output1 키에 해당하는 값이 배열이 아닙니다.");
                }
                if (br != null) {
                    br.close();
                }
            } catch (IOException e) {
                throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
            }
        }
        return historyDtoList;
    }

    public String getAccessToken(UserKeyProjection userInfo) {
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

                    return jsonNode.get("access_token").asText();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "fail";
    }

}


