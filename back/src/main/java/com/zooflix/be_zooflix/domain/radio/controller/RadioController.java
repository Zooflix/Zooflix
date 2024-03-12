package com.zooflix.be_zooflix.domain.radio.controller;

import com.zooflix.be_zooflix.domain.radio.service.RadioService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class RadioController {
    private final RadioService radioService;

    /* 1. 뉴스 크롤링 */
    @PostMapping("/radio/crawling")
    public ResponseEntity<String> selectNews() {
        String news = radioService.runPythonScript();
        System.out.println("news: " +news);
        return ResponseEntity.ok().body(news);
    }
}
