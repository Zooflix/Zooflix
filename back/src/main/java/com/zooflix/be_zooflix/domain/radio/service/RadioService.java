package com.zooflix.be_zooflix.domain.radio.service;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import jakarta.persistence.Cacheable;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import com.google.gson.JsonParser;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Cacheable
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


    private final RedisTemplate<String, String> redisTemplate;



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


//    /*
//     * 요약 by kobart
//     * */
//    public List<String> callSummaryEndpoint(String content) {
//        // JSONParser로 JSONObject로 변환
//        JsonParser parser = new JsonParser();
//        JsonObject jsonObject = parser.parse(content).getAsJsonObject();
//        // JSON 객체의 값 읽어서 출력하기
//        JsonArray context = jsonObject.getAsJsonArray("translationData");
//
//        RestTemplate restTemplate = new RestTemplate();
//        Map<String, String> requestBody = new HashMap<>();
//        List<String> result = new ArrayList<>();
//        String summary = "";
//
//        for(JsonElement element : context) {
//            String str = element.getAsString();
//            requestBody.put("text", str);
//            summary = restTemplate.postForObject(pythonEndpointNewsSummary, requestBody, String.class);
//            result.add(summary);
//        }
//
//        return result;
//    }


    /*
     * 요약 by clova
     * */
    public List<String> callSummaryEndpoint(String content) {
        // JSONParser로 JSONObject로 변환
        JsonParser parser = new JsonParser();
        JsonObject jsonObject = parser.parse(content).getAsJsonObject();
        // JSON 객체의 값 읽어서 출력하기
        JsonArray context = jsonObject.getAsJsonArray("translationData");

        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> requestBody;
        List<String> result = new ArrayList<>();

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

                result.add(summary);
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
                        summary = restTemplate.postForObject(pythonEndpointNewsSummary, requestBody,
                                String.class);
                    }
                    result.add(summary);
                }
            }
        }
        return result;
    }


//    /*
//     * tts by pysttx
//     * */
//    public String callTtsEndpoint(String content) {
//        RestTemplate restTemplate = new RestTemplate();
//        Map<String, String> requestBody = new HashMap<>();
//        String result = restTemplate.postForObject(pythonEndpointNewsTts, requestBody, String.class);
//        System.out.println("tts success");
//        return result;
//    }


    /*
    * tts by clova
    * */
    public byte[] callTtsEndpoint() {
//        String content = "미국일 원유 비축량의 깜짝 감소로 수요가 증가한 후 아시아 무역의 상승폭이 확대되었고, 우크라이나의 러시아 정유소 공격에 따른 공급 차질 가능성도 가격을 뒷받침했고, 브렌트유 선물은 GMT 기준 10센트(0.12%) 오른 배럴당 84.13달러, 미국 서부텍사스산 원유(WTI)는 7센트(0.9%) 오른 배럴당 79.79달러로 두 계약 모두 미국의 수요 전망이 높아지고 지정학적 위험이 고조되면서 수요일 약 3% 상승해 4개월 만에 최고치를 기록했다.";
//        RestTemplate restTemplate = new RestTemplate();
//        Map<String, String> requestBody = new HashMap<>();
//        requestBody.put("clientId", pythonTtsClientId);
//        requestBody.put("clientSecret", pythonTtsClientSecret);
//        requestBody.put("ttsUrl", pythonTtsUrl);
//        requestBody.put("text", content);
//
//        String result = restTemplate.postForObject(pythonEndpointNewsTts, requestBody, String.class);
//        return result;
        try {
            String text = URLEncoder.encode("미국일 원유 비축량의 깜짝 감소로 수요가 증가한 후 아시아 무역의 상승폭이 확대되었고, 우크라이나의 러시아 정유소 공격에 따른 공급 차질 가능성도 가격을 뒷받침했고, 브렌트유 선물은 GMT 기준 10센트(0.12%) 오른 배럴당 84.13달러, 미국 서부텍사스산 원유(WTI)는 7센트(0.9%) 오른 배럴당 79.79달러로 두 계약 모두 미국의 수요 전망이 높아지고 지정학적 위험이 고조되면서 수요일 약 3% 상승해 4개월 만에 최고치를 기록했다.", "UTF-8");
            URL url = new URL(pythonTtsUrl);
            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("X-NCP-APIGW-API-KEY-ID", pythonTtsClientId);
            con.setRequestProperty("X-NCP-APIGW-API-KEY", pythonTtsClientSecret);

            // post request
            String postParams = "speaker=nara&volume=5&speed=0&pitch=0&text=" + text;
            con.setDoOutput(true);
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            wr.writeBytes(postParams);
            wr.flush();
            wr.close();
            int responseCode = con.getResponseCode();
            BufferedReader br;
            if(responseCode==200) { // 정상 호출
                InputStream is = con.getInputStream();
                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                byte[] buffer = new byte[1024];
                int bytesRead;
                while ((bytesRead = is.read(buffer)) != -1) {
                    baos.write(buffer, 0, bytesRead);
                }
                baos.close();
                is.close();
                System.out.println(Arrays.toString(baos.toByteArray()));
                return baos.toByteArray();

            } else { // 오류 발생
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
                String inputLine;
                StringBuffer response = new StringBuffer();
                while ((inputLine = br.readLine()) != null) {
                    response.append(inputLine);
                }
                br.close();
                System.out.println(response.toString());
                return null;
            }
        } catch (Exception e) {
            System.out.println(e);
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
