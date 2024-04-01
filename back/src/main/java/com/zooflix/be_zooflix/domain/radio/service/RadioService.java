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
import java.util.Arrays;
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



    /*
     * 크롤링+번역
     * */
    public List<String> callCrawlingEndpoint() {
        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("webUrl", pythonNewsUrl); // 요청 바디에 크롤링사이트 url을 추가
        requestBody.put("clientId", pythonPpgClientId);
        requestBody.put("clientSecret", pythonPpgClientSecret);
        requestBody.put("ppgUrl", pythonPpgUrl);

        List<String> result = restTemplate.postForObject(pythonEndpointNewsCrawling, requestBody, List.class);
        return result;
    }



    /*
     * 요약 by clova
     * */
//    @Scheduled(cron = "0 0 0/1 * * *")
    public List<String[]> callSummaryEndpoint(List<String> data) {
        List<String[]> summaries = new ArrayList<>(); // 요약 리스트

        RestTemplate restTemplate;
        Map<String, String> requestBody;

        for (String js : data) {
            JsonParser parser = new JsonParser(); // JSONParser로 JSONObject로 변환
            JsonObject jsonObject = parser.parse(js).getAsJsonObject();
            String url = jsonObject.get("Url").getAsString();
            String title = jsonObject.get("TranslationTitle").getAsString();
            String context = jsonObject.get("TranslationContent").getAsString();

            restTemplate = new RestTemplate();
            requestBody = new HashMap<>();
            requestBody.put("clientId", pythonSummaryClientId);
            requestBody.put("clientSecret", pythonSummaryClientSecret);
            requestBody.put("clovaUrl", pythonSummaryUrl);

            // 2000자 넘을 경우 나눠서 요약하기
            String summary = "";
            if (context.length() < 2000) {
                requestBody.put("text", context);
                requestBody.put("sentence", "3");
                summary = restTemplate.postForObject(pythonEndpointNewsSummary, requestBody, String.class);

                summaries.add(new String[]{url, title, summary});
            } else {
                String delim = "다.";
                String[] arr = context.split(delim);
                int totalSize = 0;
                String request = "";
                int cnt = 0;
                for (int i = 0; i < arr.length; i++) {
                    totalSize += arr[i].length();
                    request += (arr[i] + "다.");
                    if (i + 1 == arr.length)
                        continue;
                    if (totalSize + arr[i + 1].length() > 2000) {
                        requestBody.put("text", request);
                        requestBody.put("sentence", "2");
                        totalSize = 0;
                        request = "";
                        cnt++;
                        summary += restTemplate.postForObject(pythonEndpointNewsSummary, requestBody, String.class);
                    }
                }
                summaries.add(new String[]{url, title, summary});
            }
        }
        System.out.println();
        return summaries;

    }



    /*
    *  뉴스 캐싱 in Redis
    * */
    public List<String[]> getCachedList() {
        /* 1. 캐싱된 데이터 확인 */
        List<String> cachedList = redisTemplate.opsForList().range("cachedNews", 0, -1); // 리스트에서 모든 요소 가져오기
        if (cachedList == null || cachedList.isEmpty()) {
            System.out.println("새로 캐싱하기");
            /* 2. 없다면 크롤링+번역+요약 */
            List<String> crawlingResult = callCrawlingEndpoint(); // 크롤링+번역
            List<String[]> summaryResult = callSummaryEndpoint(crawlingResult); // 요약

            /* 3. 레디스에 저장 */
            if (!summaryResult.isEmpty()) {
                for (String[] arr : summaryResult) {
                    String serialized = String.join(" @@@ ", arr);
                    redisTemplate.opsForList().rightPush("cachedNews", serialized);
                    redisTemplate.expire("cachedNews", Duration.ofDays(1));
                }
            }
        }
        cachedList = redisTemplate.opsForList().range("cachedNews", 0, -1);
        List<String[]> cachedDataList = new ArrayList<>();
        for (String serialized : cachedList) {
            String[] arr = serialized.split(" @@@ "); // 직렬화된 문자열을 @@@로 분할하여 다시 배열로 변환
            if (arr.length>2)
                cachedDataList.add(arr);
        }
        return cachedDataList;

    }


    /*
     * tts by clova
     * */
    public List<byte[]> callTtsEndpoint(List<String[]> data) {
        try {
            List<byte[]> byteList = new ArrayList<>();
            for (String[] str : data) {
                if (str.length>2) {
                    String text = str[2]; // 기사 본문
                    System.out.println("cachedNews: " + text);
                    String encodeText = URLEncoder.encode(text, StandardCharsets.UTF_8.toString());

                    URL url = new URL(pythonTtsUrl);
                    HttpURLConnection con = (HttpURLConnection) url.openConnection();
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
                        byteList.add(baos.toByteArray());
                        System.out.println("하나씩 저장 완료");
                    } else { // 오류 발생
                        System.out.println("tts 오류");
                        return null;
                    }
                }
            }
            System.out.println("byteList add 완료");
            return byteList;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    /*
     *  오디오 캐싱 in Redis
     * */
    public List<byte[]> getAudioList() {
        /* 1. 캐싱된 데이터 확인 */
        List<String> cachedList = redisTemplate.opsForList().range("audioList", 0, -1); // 리스트에서 모든 요소 가져오기
        if (cachedList == null || cachedList.isEmpty()) {
            System.out.println("오디오 새로 캐싱하기");
            /* 2. 없다면 크롤링된 캐싱 가져오기 */
            List<String[]> summaryResult = getCachedList();
            List<byte[]> audioResult = callTtsEndpoint(summaryResult); // tts

            /* 3. 레디스에 저장 */
            if (!audioResult.isEmpty()) {
                for(byte[] arr:audioResult) {
                    String serialized = new String(arr);
                    redisTemplate.opsForList().rightPush("audioList", serialized);
                    redisTemplate.expire("audioList", Duration.ofDays(1));
                }
            }
        }
        System.out.println(cachedList);
        cachedList = redisTemplate.opsForList().range("audioList", 0, -1);
        List<byte[]> cachedDataList = new ArrayList<>();
        for (String serialized : cachedList) {
            byte[] arr = serialized.getBytes();
            cachedDataList.add(arr);
        }
        return cachedDataList;

    }


}
