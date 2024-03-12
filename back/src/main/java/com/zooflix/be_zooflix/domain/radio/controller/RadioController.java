package com.zooflix.be_zooflix.domain.radio.controller;

import com.zooflix.be_zooflix.domain.radio.service.RadioService;
import io.swagger.v3.oas.annotations.Operation;
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
    @Operation(summary = "기사 웹크롤링")
    public ResponseEntity<String> selectRadio() {
        String result = radioService.callCrawlingEndpoint();
        System.out.println("result: " + result);
        return ResponseEntity.ok().body(result);
    }
}
