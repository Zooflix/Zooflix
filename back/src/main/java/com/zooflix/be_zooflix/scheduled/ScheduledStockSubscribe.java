package com.zooflix.be_zooflix.scheduled;

import com.zooflix.be_zooflix.domain.alarm.entity.Alarm;
import com.zooflix.be_zooflix.domain.alarm.entity.AlarmTypeStatus;
import com.zooflix.be_zooflix.domain.alarm.repository.AlarmRepository;
import com.zooflix.be_zooflix.domain.alarm.service.AlarmService;

import com.zooflix.be_zooflix.domain.stockSubscribe.dto.StockSubscribeProjection;
import com.zooflix.be_zooflix.domain.stockSubscribe.repository.StockSubscribeRepository;
import com.zooflix.be_zooflix.domain.user.entity.User;
import com.zooflix.be_zooflix.domain.user.repository.UserRepository;
import com.zooflix.be_zooflix.global.securityAlgo.AesUtils;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

@Component
public class ScheduledStockSubscribe {

    private final StockSubscribeRepository stockSubscribeRepository;
    private final AlarmService alarmService;
    private final UserRepository userRepository;
    private final AlarmRepository alarmRepository;
    private final AesUtils aesUtils;

    @Autowired
    public ScheduledStockSubscribe(StockSubscribeRepository stockSubscribeRepository, AlarmService alarmService, UserRepository userRepository, AlarmRepository alarmRepository, AesUtils aesUtils) {
        this.stockSubscribeRepository = stockSubscribeRepository;
        this.alarmService = alarmService;
        this.userRepository = userRepository;
        this.alarmRepository = alarmRepository;
        this.aesUtils = aesUtils;
    }

    @Scheduled(cron = "0 25 23 * * ?")
    public void performTask() throws IOException {
        // 특정 시간에 데이터베이스에서 주식 구독한 사람들 리스트 가져오기

        List<StockSubscribeProjection> stockSubscribers = stockSubscribeRepository.findTomorrowSubscribe();

        if (stockSubscribers.size() == 0) {
            System.out.println("내일 날짜에 구독한 사용자가 없습니다.");
        } else {
            System.out.println("내일 날짜에 구독한 주식을 예약구매 하고 있습니다.");
            for (StockSubscribeProjection subscriber : stockSubscribers) {

                String AccessReturn = getAccessToken(subscriber);
                System.out.println(AccessReturn);

                // 주문 가능 수량 조회
                //필요한 것 - 계좌번호, 종목코드, 주문수량, OAUTH API ACCESS TOKEN, 발급받은 APPKEY, 앱 시크릿키,
                String account = aesUtils.aesCBCDecode(subscriber.getUserAccount(), "db");
                // 국내 주식 예약 주문
                String url = "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/trading/order-resv";
                String tr_id = "CTSC0008U";
                String data = "{\n" +
                        "    \"CANO\": \"" + account.substring(0, 8) + "\",\n" + // 계좌번호 앞 8자리
                        "    \"ACNT_PRDT_CD\": \"" + account.substring(8) + "\",\n" + // 계좌번호 뒤 2자리
                        "    \"PDNO\": \"" + subscriber.getStockCode() + "\",\n" +
                        "    \"ORD_QTY\": \"" + subscriber.getStockCount() + "\",\n" +
                        "    \"ORD_UNPR\": \"0\",\n" + // 시장가로 구매
                        "    \"SLL_BUY_DVSN_CD\": \"02\",\n" + // 매수
                        "    \"ORD_DVSN_CD\": \"01\",\n" + // 시장가 구매
                        "    \"ORD_OBJT_CBLC_DVSN_CD\": \"10\",\n" +
                        "    \"LOAN_DT\": \"\",\n" +
                        "    \"RSVN_ORD_END_DT\":\"\"" +
                    "}";
                System.out.println(data.toString());
                httpPostBodyConnection(url, data, tr_id, subscriber, AccessReturn);
            }
        }
    }

    public String getAccessToken(StockSubscribeProjection subscriber) {
        // HttpClient 인스턴스 생성
        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            // API 엔드포인트 URL
            String accessUrl = "https://openapi.koreainvestment.com:9443/oauth2/tokenP";

            // POST 요청 생성
            HttpPost httpPost = new HttpPost(accessUrl);

            // 요청 본문 데이터
            String accessData = "{\n" +
                    "    \"grant_type\": \"client_credentials\",\n" +
                    "    \"appkey\": \"" + aesUtils.aesCBCDecode(subscriber.getUserAppKey(), "db") + "\",\n" +
                    "    \"appsecret\": \"" + aesUtils.aesCBCDecode(subscriber.getUserSecretKey(), "db") + "\"\n" +
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

    // 전날에 구독한 사용자들에게 알림 보내기 (저녁 8시)
    @Scheduled(cron = "0 0 20 * * ?")
    public void sendNotificationToSubscribers(){

        // 내일 설정
        LocalDate tomorrow = LocalDate.now().plusDays(1);
        int day = tomorrow.getDayOfMonth();

        //내일 구독한 사용자들 찾기
        List<StockSubscribeProjection> subscribers = stockSubscribeRepository.findTomorrowSubscribe();

        for(StockSubscribeProjection subscriber : subscribers){
            User stockSubscriber = userRepository.findByUserId(subscriber.getUserId());
            String content = "내일은 "+ subscriber.getStockName() + "주식을 정기 구독한 날입니다.";
            alarmService.send(stockSubscriber, content, AlarmTypeStatus.TOMORROW);

            Alarm alarm = new Alarm();
            alarm.setReceiverUser(stockSubscriber);
            alarm.setContent(content);
            alarm.setAlarmType(AlarmTypeStatus.TOMORROW);
            alarm.setIsRead(false);
            alarm.setCreatedAt(LocalDateTime.now());
            alarmRepository.save(alarm);
        }
    }

    public String httpPostBodyConnection(String UrlData, String ParamData, String TrId, StockSubscribeProjection subscriber, String accessToken) throws IOException {

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
            conn.setRequestProperty("appKey", aesUtils.aesCBCDecode(subscriber.getUserAppKey(), "db"));
            conn.setRequestProperty("appSecret", aesUtils.aesCBCDecode(subscriber.getUserSecretKey(), "db"));
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
            System.out.println("http 요청 방식" + "POST BODY JSON");
            System.out.println("http 요청 타입" + "application/json");
            System.out.println("http 요청 주소" + UrlData);
            System.out.println("");

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

}