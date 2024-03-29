package com.zooflix.be_zooflix.domain.radio.service;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import com.google.gson.JsonParser;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RadioService {
    /* News.py 엔드포인트 */
    @Value("${python.endpoint.news.crawling}")
    private String pythonEndpointNewsCrawling;
    @Value("${python.endpoint.news.summary}")
    private String pythonEndpointNewsSummary;
    @Value("${python.endpoint.news.tts}")
    private String pythonEndpointNewsTts;

    /* 웹크롤링하는 웹사이트 url */
    @Value("${python.news.url}")
    private String pythonNewsUrl;

    /* 번역 관련 변수 */
    @Value("${python.ppg.clientId}")
    private String pythonPpgClientId;
    @Value("${python.ppg.clientSecret}")
    private String pythonPpgClientSecret;
    @Value("${python.ppg.url}")
    private String pythonPpgUrl;

    /* 요약 관련 변수 */
    @Value("${python.summary.clientId}")
    private String pythonSummaryClientId;
    @Value("${python.summary.clientSecret}")
    private String pythonSummaryClientSecret;
    @Value("${python.summary.url}")
    private String pythonSummaryUrl;

    /* tts 관련 변수 */
    @Value("${python.tts.url}")
    private String pythonTtsUrl;
    @Value("${python.tts.clientId}")
    private String pythonTtsClientId;
    @Value("${python.tts.clientSecret}")
    private String pythonTtsClientSecret;


    @Qualifier("RedisTemplate")
    private final RedisTemplate<String, String> redisTemplate;

    @Qualifier("zooflixRedis")
    private final RedisConnectionFactory zooflixRedis;


    /*
     * 크롤링+번역
     * */
    public String callCrawlingEndpoint() {
        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("webUrl", pythonNewsUrl); // 요청 바디에 크롤링사이트 url을 추가
        requestBody.put("clientId", pythonPpgClientId);
        requestBody.put("clientSecret", pythonPpgClientSecret);
        requestBody.put("ppgUrl", pythonPpgUrl);

        String result = restTemplate.postForObject(pythonEndpointNewsCrawling, requestBody, String.class);
        return result;
    }


    /*
     * 요약 by clova
     * */
    @Scheduled(cron = "0 0 0/1 * * *")
    public void postNews() {
        /* 1. 캐싱된 데이터 확인 */
        List<String> cachedDataList = redisTemplate.opsForList().range("cachedNews", 0, -1);
        if (cachedDataList != null && !cachedDataList.isEmpty()) {
            System.out.println("캐시된 데이터 사용 "+cachedDataList);
            return; // 캐시된 데이터가 있으면 새로운 데이터를 가져오지 않고 종료
        }

        /* 2. 크롤링+번역 */
        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("webUrl", pythonNewsUrl); // 요청 바디에 크롤링사이트 url을 추가
        requestBody.put("clientId", pythonPpgClientId);
        requestBody.put("clientSecret", pythonPpgClientSecret);
        requestBody.put("ppgUrl", pythonPpgUrl);

        String result = restTemplate.postForObject(pythonEndpointNewsCrawling, requestBody, String.class);
        System.out.println("크롤링+번역 완료");

        /* 3. 요약 */
        List<String> summaries = new ArrayList<>(); // 요약 리스트

        JsonParser parser = new JsonParser(); // JSONParser로 JSONObject로 변환
        JsonObject jsonObject = parser.parse(result).getAsJsonObject();
        JsonArray context = jsonObject.getAsJsonArray("translationData"); // JSON 객체의 값 읽어서 출력하기

        restTemplate = new RestTemplate();
        for (JsonElement element : context) {
            String str = element.getAsString();
            // 2000자 넘을 경우 나눠서 요약하기
            String summary = "";
            if (str.length() < 2000) {
                requestBody = new HashMap<>();
                requestBody.put("clientId", pythonSummaryClientId);
                requestBody.put("clientSecret", pythonSummaryClientSecret);
                requestBody.put("clovaUrl", pythonSummaryUrl);
                requestBody.put("text", str);
                summary = restTemplate.postForObject(pythonEndpointNewsSummary, requestBody, String.class);

                summaries.add(summary);
            } else {
                String delim = "다.";
                String[] arr = str.split(delim);
                int totalSize = 0;
                String request = "";
                for (int i = 0; i < arr.length; i++) {
                    totalSize += arr[i].length();
                    request += (arr[i] + "다.");
                    if (i + 1 == arr.length)
                        continue;
                    if (totalSize + arr[i + 1].length() > 2000) {
                        requestBody = new HashMap<>();
                        requestBody.put("clientId", pythonSummaryClientId);
                        requestBody.put("clientSecret", pythonSummaryClientSecret);
                        requestBody.put("clovaUrl", pythonSummaryUrl);
                        requestBody.put("text", request);
                        totalSize = 0;
                        request = "";
                        summary += restTemplate.postForObject(pythonEndpointNewsSummary, requestBody, String.class);
                    }

                    summaries.add(summary);
                }
            }
        }
        /* 4. 데이터 캐싱 */
        if (!summaries.isEmpty()) {
            redisTemplate.opsForList().rightPushAll("cachedNews", summaries);
            redisTemplate.expire("cachedNews", Duration.ofDays(1));
        }
        System.out.println("요약 캐싱 완료");
    }

    /*
     * tts by clova
     * */
    public byte[] callTtsEndpoint() {
        try {
            List<String> cachedDataList = redisTemplate.opsForList().range("cachedNews", 0, -1);
            String text = "";
            for(String str:cachedDataList) {
                text += str;
            }
            System.out.println("cachedNews: "+text);
            String encodeText = URLEncoder.encode(text, StandardCharsets.UTF_8.toString());
            URL url = new URL(pythonTtsUrl);
            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("X-NCP-APIGW-API-KEY-ID", pythonTtsClientId);
            con.setRequestProperty("X-NCP-APIGW-API-KEY", pythonTtsClientSecret);
            con.setDoOutput(true);

            String postParams = "speaker=vgoeun&volume=4&speed=0&pitch=0&text=" + encodeText;
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.writeBytes(postParams);
            wr.flush();
            wr.close();
            int responseCode = con.getResponseCode();
            if (responseCode == 200) { // 정상 호출
                InputStream is = con.getInputStream();
                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                byte[] buffer = new byte[1024];
                int bytesRead;
                while ((bytesRead = is.read(buffer)) != -1) {
                    baos.write(buffer, 0, bytesRead);
                }
                is.close();
                System.out.println("tts 완료");
                return baos.toByteArray();
            } else { // 오류 발생
                System.out.println("tts 오류");
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }



    //    /*
//    * 키워드 추출
//    * */
//    public String getKeyword() {
//        String crawling = callCrawlingEndpoint();
//        System.out.println(crawling);
//        System.out.println("crawling success");
//        String refine = crawling.replace("\",\"", "@@@@@");
//        List<String> keywordList = new ArrayList<>();
//        String[] arr = refine.split("@@@@@");
//        String result = "";
//        for(String str : arr ) {
//            System.out.println(str);
//            RestTemplate restTemplate = new RestTemplate();
//            Map<String, String> requestBody = new HashMap<>();
//            requestBody.put("content", str);
//
//            String keyword = restTemplate.postForObject("http://127.0.0.1:8000/radio/keyword", requestBody, String.class);
//            keywordList.add(keyword.replace("\\n", " "));
//
//        }
//        System.out.println("keywordList: "+keywordList);
////        for(String str : summaryList) {
////            String result = callTtsEndpoint(str);
////            System.out.println(result);
////        }
//        return "success";
//    }
}