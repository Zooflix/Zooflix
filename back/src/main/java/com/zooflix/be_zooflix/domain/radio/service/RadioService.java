package com.zooflix.be_zooflix.domain.radio.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import com.google.gson.JsonParser;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RadioService {

    final String REDIS_NEWS_KEY = "cachedNews";
    final String REDIS_DELIMITER = " @@@ ";
    final String REDIS_LAST_UPDATE_TIME = "lastUpdateTime";
    final String TEMP_LIST = "tempList";

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
    private ObjectMapper objectMapper = new ObjectMapper();



    /*
     * 크롤링
     * */
    public List<String> callCrawlingEndpoint() {
        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("webUrl", pythonNewsUrl); // 요청 바디에 크롤링사이트 url을 추가

        return restTemplate.postForObject(pythonEndpointNewsCrawling, requestBody, List.class);
    }

    /*
     * 번역
     * */
    public List<String> callTranslationEndpoint(List<String> crawlingData) {
        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("clientId", pythonPpgClientId);
        requestBody.put("clientSecret", pythonPpgClientSecret);
        requestBody.put("ppgUrl", pythonPpgUrl);
        requestBody.put("list", crawlingData);

        return restTemplate.postForObject(pythonEndpointNewsCrawling, requestBody,  List.class);
    }

    /*
     * 요약 by clova
     * */
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
                        summary += restTemplate.postForObject(pythonEndpointNewsSummary, requestBody, String.class);
                    }
                }
                summaries.add(new String[]{url, title, summary});
            }
        }
        return summaries;

    }


    /*
    * 크롤링+번역+클로바
    * */
    public List<String[]> getNews() {
        List<String> crawlingResult = callCrawlingEndpoint();
        List<String> translationResult = callTranslationEndpoint(crawlingResult);
        List<String[]> newsResult = callSummaryEndpoint(translationResult);
        return newsResult;
    }


    /*
    * 레디스에 저장
    * */
    @Scheduled(cron = "0 0 0/2 * * *")
    public void saveNews() {
        List<String[]> newNews = getNews();
        for(String[] str : newNews) {
            String serialized = String.join(REDIS_DELIMITER, str);
            redisTemplate.opsForList().rightPush(REDIS_NEWS_KEY, serialized);
        }
    }

    /*
    * 레디스 조회
    * */
    public List<String[]> getCachedNews() {
        List<String[]> cachedNews = new ArrayList<>();
        List<String> cached = redisTemplate.opsForList().range(REDIS_NEWS_KEY, 0,-1);
        if (cached==null || cached.size()==0)  {
            saveNews();
        }
        for(String serialized : cached) {
            String[] arr = serialized.split(REDIS_DELIMITER);
            if (arr.length>2) cachedNews.add(arr);
        }
        return cachedNews;
    }

    /*
     * 레디스 업데이트
     * */
    @Scheduled(cron = "0 0 0/2 * * *")
    public void updateNews() {
        List<String> newNews = callCrawlingEndpoint(); // 크롤링한 새 데이터
        List<String[]> cachedNews = getCachedNews(); // 캐싱데이터
        List<String[]> updatedNews = new ArrayList<>();

        for (String str : newNews) {
            JsonParser parser = new JsonParser(); // JSONParser로 JSONObject로 변환
            JsonObject jsonObject = parser.parse(str).getAsJsonObject();
            String url = jsonObject.get("Url").getAsString();

            for(String[] arr : cachedNews) {
                if (arr[0]!=url) continue;
                updatedNews.add(arr);
            }
        }
//        for(String[] arr:newNews) {
//            String serialized = String.join(REDIS_DELIMITER, arr);
//            if (!newNews.contains(serialized)) continue;
//            updatedNews.add(arr);
//        }

        if (updatedNews.size()!=0 || !updatedNews.isEmpty()) {
            redisTemplate.delete(REDIS_NEWS_KEY);
            for(String[] arr:cachedNews) {
                String serialized = String.join(REDIS_DELIMITER, arr);
                redisTemplate.opsForList().rightPush(REDIS_NEWS_KEY, serialized);
            }
        }
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
                    } else { // 오류 발생
                        return null;
                    }
                }
            }
            return byteList;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


}
