package com.zooflix.be_zooflix.domain.radio.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class RadioService {

    /* News.py 크롤링 엔드포인트 */
    @Value("${python.endpoint.news.crawling}")
    private String pythonEndpointNewsCrawling;

    /* News.py 요약 엔드포인트 */
    @Value("${python.endpoint.news.summary}")
    private String pythonEndpointNewsSummary;

    /* News.py tts 엔드포인트 */
    @Value("${python.endpoint.news.tts}")
    private String pythonEndpointNewsTts;

    /* 웹크롤링하는 웹사이트 url */
    @Value("${python.news.url}")
    private String pythonNewsUrl;


    /*
    * 웹크롤링
    * */
    public String callCrawlingEndpoint() {
        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("webUrl", pythonNewsUrl); // 요청 바디에 크롤링사이트 url을 추가

        String result = restTemplate.postForObject(pythonEndpointNewsCrawling, requestBody, String.class);
        System.out.println("crawling result: "+result);
        return result;
    }


    /*
    * 번역
    * */
//    public String


    /*
     * 요약
     * */
    public String callSummaryEndpoint(String content) throws JsonProcessingException {
        System.out.println("summary parameter: "+content);
        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("text", content);

        String result = restTemplate.postForObject(pythonEndpointNewsSummary, requestBody, String.class);
        return result;
    }

    /*
     * tts
     * */
    public String callTtsEndpoint(String content) {
        System.out.println("tts parameter: "+content);
        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("text", content);
        String result = restTemplate.postForObject(pythonEndpointNewsTts, requestBody, String.class);
        System.out.println("tts result: "+result);
        return result;
    }

    /*
    * 라디오봇
    * */
    public String getRadio() throws JsonProcessingException {
        List<String> summaryList = new ArrayList<>();
        while (summaryList.size()<2) {
            String crawling = callCrawlingEndpoint();
            System.out.println("crawling success");
            String summary = callSummaryEndpoint(crawling);
            System.out.println("summary success");
            summaryList.add(summary);
        }
        System.out.println("summaryList: "+summaryList);
        for(String str : summaryList) {
            String result = callTtsEndpoint(str);
            System.out.println(result);
        }
        return "success";
    }
}
