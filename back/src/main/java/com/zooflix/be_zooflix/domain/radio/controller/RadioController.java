package com.zooflix.be_zooflix.domain.radio.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.zooflix.be_zooflix.domain.radio.service.RadioService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class RadioController {

    private final RadioService radioService;

    /* 라디오봇 */
    @PostMapping("/radio/translation/summary")
    @Operation(summary = "번역 후 요약")
    public ResponseEntity<?> playRadio() throws JsonProcessingException {
//        String crawlingResult = radioService.callCrawlingEndpoint();
//        String translationResult = radioService.callTranslationEndpoint(crawlingResult);
//        String summaryResult = radioService.callSummaryEndpoint(translationResult);
//        String summaryResult = radioService.callSummaryEndpoint();
        String result = radioService.getRadio();
        System.out.println("번역 후 요약: "+result);
        return ResponseEntity.ok().body(result);
    }

//    /* 키워드 겟 */
//    @PostMapping("/radio/getKeyword")
//    @Operation(summary = "키워드 추출")
//    public ResponseEntity<?> getKeyword() {
//        String result = radioService.getKeyword();
//        System.out.println(result);
//        return ResponseEntity.ok().body(result);
//    }

}
