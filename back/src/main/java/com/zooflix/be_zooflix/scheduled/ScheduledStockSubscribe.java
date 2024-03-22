package com.zooflix.be_zooflix.scheduled;

import ch.qos.logback.core.CoreConstants;
import com.zooflix.be_zooflix.domain.alarm.entity.AlarmTypeStatus;
import com.zooflix.be_zooflix.domain.alarm.service.AlarmService;
import com.zooflix.be_zooflix.domain.stockSubscribe.dto.StockSubscribeDto;
import com.zooflix.be_zooflix.domain.stockSubscribe.repository.StockSubscribeRepository;
import com.zooflix.be_zooflix.domain.user.entity.User;
import com.zooflix.be_zooflix.domain.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.util.*;

@Component
public class ScheduledStockSubscribe {

    private final StockSubscribeRepository stockSubscribeRepository;
    private final AlarmService alarmService;
    private final UserRepository userRepository;

    @Autowired
    public ScheduledStockSubscribe(StockSubscribeRepository stockSubscribeRepository, AlarmService alarmService, UserRepository userRepository) {
        this.stockSubscribeRepository = stockSubscribeRepository;
        this.alarmService = alarmService;
        this.userRepository = userRepository;
    }

    // 각 주식 구독자에 대한 작업 수행
    // 예약 주문하고 주식 구독 구매 내역 테이블에 추가
    @Scheduled(cron = "0 20 14 * * ?")
    public void performTask() throws IOException {
        // 특정 시간에 데이터베이스에서 주식 구독한 사람들 리스트 가져오기
        List<StockSubscribeDto> stockSubscribers = stockSubscribeRepository.findTomorrowSubscribe();

        if(stockSubscribers.size() == 0){
            System.out.println("내일 날짜에 구독한 사용자가 없습니다.");
        }else{
            System.out.println("내일 날짜에 구독한 주식을 예약구매 하고 있습니다.");
            for (StockSubscribeDto subscriber : stockSubscribers) {
                // 주문 가능 수량 조회
                //필요한 것 - 계좌번호, 종목코드, 주문수량, OAUTH API ACCESS TOKEN, 발급받은 APPKEY, 앱 시크릿키,
                String account = subscriber.getUserAccount();
                // 국내 주식 예약 주문
                String url = "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/trading/order-resv";
                String tr_id = "CTSC0008U";
                String data = "{\n" +
                        "    \"CANO\":" + account.substring(0, 8) + ",\n" + // 계좌번호 앞 8자리
                        "    \"ACNT_PRDT_CD\":" + account.substring(8) + ",\n" + // 계좌번호 뒤 2자리
                        "    \"PDNO\":" + subscriber.getStockCode() + ",\n" +
                        "    \"ORD_QTY\": "+ subscriber.getStockCount() + ",\n" +
                        "    \"ORD_UNPR\": 0,\n" + // 시장가로 구매
                        "    \"SLL_BUY_DVSN_CD\": 02,\n" + // 매수
                        "    \"ORD_DVSN_CD\": 01,\n" + // 시장가 구매
                        "    \"ORD_OBJT_CBLC_DVSN_CD\": 10,\n" +
                        "}";
                httpPostBodyConnection(url, data, tr_id, subscriber);
            }
        }
    }

    // 전날에 구독한 사용자들에게 알림 보내기 (저녁 8시)
    @Scheduled(cron = "0 0 20 * * ?")
    public void sendNotificationToSubscribers(){

        // 내일 설정
        LocalDate tomorrow = LocalDate.now().plusDays(1);
        int day = tomorrow.getDayOfMonth();

        //내일 구독한 사용자들 찾기
        List<StockSubscribeDto> subscribers = stockSubscribeRepository.findSubscribersForDay(day);

        for(StockSubscribeDto subscriber : subscribers){
            User stockSubscriber = userRepository.findByUserId(subscriber.getUserId());
            alarmService.send(stockSubscriber, "내일은 "+ subscriber.getStockName() + "주식을 정기 구독한 날입니다.", AlarmTypeStatus.TOMORROW);
        }
    }


    public void httpPostBodyConnection(String UrlData, String ParamData, String TrId, StockSubscribeDto subscriber) throws IOException {
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
            conn.setRequestProperty("authorization", "Bearer {TOKEN}");
            conn.setRequestProperty("appKey", "{Client_ID}");
            conn.setRequestProperty("appSecret", "{Client_Secret}");
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
                stockSubscribeRepository.addStockPurchase();

            } catch (IOException e) {
                throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
            }
        }
    }

}