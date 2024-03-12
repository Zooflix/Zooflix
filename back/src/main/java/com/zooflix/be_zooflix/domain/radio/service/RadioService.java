package com.zooflix.be_zooflix.domain.radio.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class RadioService {
    /* Main.py 경로 */
    @Value("${python.path.main}")
    private String pythonPathMain;

    /* Main.py 크롤링 엔드포인트 */
    @Value("${python.endpoint.main.crawling}")
    private String pythonEndpointMainCrawling;

    /* 웹크롤링하는 웹사이트 url */
    @Value("${python.news.url}")
    private String pythonNewsUrl;

    public String callCrawlingEndpoint() {
        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("webUrl", pythonNewsUrl); // 요청 바디에 크롤링사이트 url을 추가
        String result = restTemplate.postForObject(pythonEndpointMainCrawling, requestBody, String.class);
        return result;
    }
}
