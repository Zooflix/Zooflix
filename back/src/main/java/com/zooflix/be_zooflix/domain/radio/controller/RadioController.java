package com.zooflix.be_zooflix.domain.radio.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zooflix.be_zooflix.domain.radio.service.RadioService;
import io.swagger.v3.oas.annotations.Operation;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class RadioController {

    private final RadioService radioService;

    /* 라디오봇 */
//    @PostMapping("/radio/translation/summary/tts")
//    @Operation(summary = "번역 후 요약")
//    public ResponseEntity<byte[]> playRadio() throws JsonProcessingException {
////        String crawlingResult = radioService.callCrawlingEndpoint();
////        String translationResult = radioService.callTranslationEndpoint(crawlingResult);
////        String summaryResult = radioService.callSummaryEndpoint(translationResult);
////        String summaryResult = radioService.callSummaryEndpoint();
//        byte[] audioData = radioService.callTtsEndpoint();
//        System.out.println("번역 후 요약: ");
//        return ResponseEntity
//                .status(HttpStatus.OK)
//                .contentType(MediaType.valueOf("audio/mpeg"))
//                .body(audioData);
//    }

    @PostMapping("/radio/translation/summary/tts")
    @Operation(summary = "번역 후 요약")
    public ResponseEntity<?> playRadio() throws JsonProcessingException {
//        String crawlingResult = radioService.callCrawlingEndpoint();
//        List<String> summaryResult = radioService.callSummaryEndpoint(crawlingResult);
        byte[] audioData = radioService.callTtsEndpoint();
        System.out.println("번역 success");
        return ResponseEntity
                .status(HttpStatus.OK)
//                .contentType(MediaType.valueOf("audio/mpeg"))
                .body(audioData);
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
