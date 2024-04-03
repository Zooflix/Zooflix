package com.zooflix.be_zooflix.domain.stockSubscribe.service;

import com.zooflix.be_zooflix.domain.alarm.entity.AlarmTypeStatus;
import com.zooflix.be_zooflix.domain.alarm.service.AlarmService;
import com.zooflix.be_zooflix.domain.stockSubscribe.dto.StockSubscribeDto;
import com.zooflix.be_zooflix.domain.stockSubscribe.dto.StockSubscribeProjection;
import com.zooflix.be_zooflix.domain.stockSubscribe.dto.request.AddStockSubscribeRequest;
import com.zooflix.be_zooflix.domain.stockSubscribe.repository.StockSubscribeRepository;
import com.zooflix.be_zooflix.domain.user.dto.UserKeyProjection;
import com.zooflix.be_zooflix.domain.user.repository.UserRepository;
import com.zooflix.be_zooflix.global.securityAlgo.AesUtils;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import com.zooflix.be_zooflix.domain.user.entity.User;
import com.zooflix.be_zooflix.domain.stockSubscribe.entity.StockSubscribe;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class StockSubscribeService {
    private final UserRepository userRepository;
    private final StockSubscribeRepository stockSubscribeRepository;
    private final AlarmService alarmService;

    private final AesUtils aesUtils;

    /**
     * 3.1 주식 정기 구독
     *
     */
    @Transactional
    public String postSubscribe(AddStockSubscribeRequest request) throws IOException {
        User user = userRepository.findByUserId(request.getUserId());
        
        String requestAppKey = aesUtils.aesCBCDecode(request.getUserAppKey(), "api");

        if (!requestAppKey.isEmpty()) {
            requestAppKey = aesUtils.APItoDB(request.getUserAppKey());
            String requestSecretKey = aesUtils.APItoDB(request.getUserSecretKey());
            String requestAccount = aesUtils.APItoDB(request.getUserAccount());
            user.userUpdateKey(
                    user.getUserId(),   //추가됨
                    user.getUserName(),
                    user.getUserPw(),
                    requestAppKey,
                    requestSecretKey,
                    requestAccount
            );
        }
        userRepository.save(user);

        StockSubscribe subscribe = StockSubscribe.createStockSubscribe(
                user,
                request.getStockCode(),
                request.getStockName(),
                request.getStockCount(),
                request.getStockSubscribeDay()
        );

        subscribe = stockSubscribeRepository.save(subscribe);

        LocalDate now = LocalDate.now();

        if(request.getStockSubscribeDay() == now.getDayOfMonth()){
            String AccessReturn = getAccessToken(subscribe);

            String account = aesUtils.aesCBCDecode(subscribe.getUser().getUserAccount(), "db");
            // 국내 주식 주문
            String url = "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/trading/order-cash";
            String tr_id = "TTTC0802U";
            String data = "{\n" +
                    "    \"CANO\": \"" + account.substring(0, 8) + "\",\n" + // 계좌번호 앞 8자리
                    "    \"ACNT_PRDT_CD\": \"" + account.substring(8) + "\",\n" + // 계좌번호 뒤 2자리
                    "    \"PDNO\": \"" + subscribe.getStockCode() + "\",\n" +
                    "    \"ORD_DVSN\": \"01\",\n" + // 시장가 구매
                    "    \"ORD_QTY\": \"" + subscribe.getStockCount() + "\",\n" +
                    "    \"ORD_UNPR\": \"0\"\n" + // 시장가로 구매
                    "}";
            System.out.println(data.toString());
            httpPostBodyConnection(url, data, tr_id, subscribe, AccessReturn);
        }
        return subscribe.getStockCode();
    }

    public String getAccessToken(StockSubscribe subscriber) {
        // HttpClient 인스턴스 생성
        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            // API 엔드포인트 URL
            String accessUrl = "https://openapi.koreainvestment.com:9443/oauth2/tokenP";

            // POST 요청 생성
            HttpPost httpPost = new HttpPost(accessUrl);

            // 요청 본문 데이터
            String accessData = "{\n" +
                    "    \"grant_type\": \"client_credentials\",\n" +
                    "    \"appkey\": \"" +  aesUtils.aesCBCDecode(subscriber.getUser().getUserAppKey(), "db") + "\",\n" +
                    "    \"appsecret\": \"" + aesUtils.aesCBCDecode(subscriber.getUser().getUserSecretKey(), "db")+ "\"\n" +
                    "}";
            StringEntity requestBody = new StringEntity(accessData);
            httpPost.setEntity(requestBody);
            httpPost.setHeader("Content-type", "application/json");

            // HTTP 요청 보내고 응답 받기
            try (CloseableHttpResponse response = httpClient.execute(httpPost)) {
                // 응답 상태코드 확인
                int statusCode = response.getStatusLine().getStatusCode();
                System.out.println("응답 상태코드: " + statusCode);

                // 응답 본문 읽기
                HttpEntity entity = response.getEntity();
                if (entity != null) {
                    String responseBody = EntityUtils.toString(entity);
                    System.out.println("응답 본문: " + responseBody);
                    JSONParser parser = new JSONParser();
                    JSONObject jsonObject = (JSONObject) parser.parse(responseBody);
                    return jsonObject.get("access_token").toString();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "fail";
    }

    public String httpPostBodyConnection(String UrlData, String ParamData, String TrId, StockSubscribe subscriber, String accessToken) throws IOException {

        String totalUrl = "";
        totalUrl = UrlData.trim().toString();

        URL url = null;
        HttpURLConnection conn = null;

        String responseData = "";
        BufferedReader br = null;

        StringBuffer sb = new StringBuffer();
        String returnData = "";

        try {
            url = new URL(totalUrl);
            conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("authorization", "Bearer "+accessToken.trim());
            conn.setRequestProperty("appKey", aesUtils.aesCBCDecode(subscriber.getUser().getUserAppKey(), "db"));
            conn.setRequestProperty("appSecret", aesUtils.aesCBCDecode(subscriber.getUser().getUserSecretKey(), "db"));
            conn.setRequestProperty("tr_id", TrId);
            conn.setDoOutput(true);

            try (OutputStream os = conn.getOutputStream()) {
                byte request_data[] = ParamData.getBytes("utf-8");
                os.write(request_data);
                os.close();
            } catch (Exception e) {
                e.printStackTrace();
            }

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
                System.out.println("http 응답 코드 : " + responseCode);
                System.out.println("http 응답 데이터 : " + returnData);
                if (br != null) {
                    br.close();
                }

                //성공하면 구매 내역 테이블에 추가
//                stockSubscribeRepository.addStockPurchase();

                return returnData;

            } catch (IOException e) {
                throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
            }
        }
    }

    /**
     * 3.2 주식 정기 구독 해지
     *
     */
    public int terminationSubscribe(int stockSubscribeNo, int userNo){
        StockSubscribe subscribe = stockSubscribeRepository.findByStockSubscribeNo(stockSubscribeNo);
        if (userNo != subscribe.getUser().getUserNo()) {
            throw new RuntimeException("토큰 정보와 일치하는 유저가 아닙니다!");
        }
        stockSubscribeRepository.delete(subscribe);

        //예약주문된 내역이 있다면 주문취소하기

        return stockSubscribeNo;
    }

    /**
     * 3.3 주식 구독 목록 조회
     *
     */
    public List<StockSubscribeDto> subscribeList(String userId){
        User user = userRepository.findByUserId(userId);

        List<StockSubscribe> subscribes = stockSubscribeRepository.findByUser(user.getUserNo());

        if(subscribes.isEmpty()) {
            throw new RuntimeException("주식 구독 내역이 존재하지 않습니다.");
        }

        List<StockSubscribeDto> response = subscribes.stream()
                .map(this::convertToStockSubscribeDto)
                .collect(Collectors.toList());;

        return response;
    }

    public boolean checkApiKey(int userNo) {
        UserKeyProjection userKey = userRepository.findByUserNo(userNo);
        String userAppKey = aesUtils.aesCBCDecode(userKey.getUserAppKey(), "db");
        String userSecretKey = aesUtils.aesCBCDecode(userKey.getUserSecretKey(), "db");
        String userAccount = aesUtils.aesCBCDecode(userKey.getUserAccount(), "db");
        return !userAppKey.isEmpty() && !userSecretKey.isEmpty() && !userAccount.isEmpty();
    }

    private StockSubscribeDto convertToStockSubscribeDto(StockSubscribe stockSubscribe) {
        StockSubscribeDto dto = new StockSubscribeDto();
        dto.setStockSubscribeNo(stockSubscribe.getStockSubscribeNo());
        dto.setStockCode(stockSubscribe.getStockCode());
        dto.setStockName(stockSubscribe.getStockName());
        dto.setStockCount(stockSubscribe.getStockCount());
        dto.setStockSubscribeDay(stockSubscribe.getStockSubscribeDay());
        dto.setStockSubscribeCreate(stockSubscribe.getStockSubscribeCreate());
        dto.setUserId(stockSubscribe.getUser().getUserId());
        return dto;
    }

}

