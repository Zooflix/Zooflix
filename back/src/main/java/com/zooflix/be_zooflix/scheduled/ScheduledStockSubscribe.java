package com.zooflix.be_zooflix.scheduled;

import com.zooflix.be_zooflix.domain.stockSubscribe.entity.StockSubscribe;
import com.zooflix.be_zooflix.domain.stockSubscribe.repository.StockSubscribeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

@Component
public class ScheduledStockSubscribe {

    private final StockSubscribeRepository stockSubscribeRepository;

    @Autowired
    public ScheduledStockSubscribe(StockSubscribeRepository stockSubscribeRepository) {
        this.stockSubscribeRepository = stockSubscribeRepository;
    }

            // 각 주식 구독자에 대한 작업 수행
            // 예약 주문하고 주식 구독 구매 내역 테이블에 추가
            @Scheduled(cron = "0 30 18 * * ?")
            public void performTask() throws IOException {
                // 특정 시간에 데이터베이스에서 주식 구독한 사람들 리스트 가져오기
                List<StockSubscribe> stockSubscribers = stockSubscribeRepository.findTomorrowSubscribe();

                // 가져온 주식 구독자 리스트를 이용하여 필요한 작업 수행

                //필요한 것 - 계좌번호, 종목코드, 주문수량, OAUTH API ACCESS TOKEN, 발급받은 APPKEY, 앱 시크릿키,
                for (StockSubscribe subscriber : stockSubscribers) {

            // 주문 가능 수량 조회

            // 국내 주식 예약 주문
            String url = "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/trading/order-resv";
            String tr_id = "CTSC0008U";
            String data = "{\n" +
                    "    \"CANO\": \"종합계좌번호\",\n" + // 계좌번호 앞 8자리
                    "    \"ACNT_PRDT_CD\": \"계좌상품코드\",\n" + // 계좌번호 뒤 2자리
                    "    \"PDNO\": \"종목코드(6자리)\",\n" +
                    "    \"ORD_QTY\": \"주문수량\",\n" +
                    "    \"ORD_UNPR\": 0,\n" + // 시장가로 구매
                    "    \"SLL_BUY_DVSN_CD\": 02,\n" + // 매수
                    "    \"ORD_DVSN_CD\": 01,\n" + // 시장가 구매
                    "    \"ORD_OBJT_CBLC_DVSN_CD\": 10,\n" +
                    "}";
            httpPostBodyConnection(url,data,tr_id);
        }
    }

    public static void httpPostBodyConnection(String UrlData, String ParamData,String TrId) throws IOException {
        String totalUrl = "";
        totalUrl = UrlData.trim().toString();

        URL url = null;
        HttpURLConnection conn = null;

        String responseData = "";
        BufferedReader br = null;

        StringBuffer sb = new StringBuffer();
        String returnData = "";

        try{
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
        } catch (IOException e){
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
                if (br != null){
                    br.close();
                }
            } catch (IOException e){
                throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
            }
        }
    }

}