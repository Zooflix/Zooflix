package com.zooflix.be_zooflix.domain.radio.controller;

import static org.springframework.data.redis.connection.ReactiveStreamCommands.AddStreamRecord.body;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zooflix.be_zooflix.domain.radio.service.RadioService;
import io.swagger.v3.oas.annotations.Operation;
import java.io.ByteArrayInputStream;
import java.util.Arrays;
import java.util.List;
import javazoom.jl.decoder.JavaLayerException;
import javazoom.jl.player.Player;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @GetMapping(value = "/radio", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    @Operation(summary = "번역 후 요약")
    public ResponseEntity<byte[]> playRadio() throws JsonProcessingException {
//        String crawlingResult = radioService.callCrawlingEndpoint();
//        List<String> summaryResult = radioService.callSummaryEndpoint(crawlingResult);
        byte[] audio = radioService.callTtsEndpoint();
        System.out.println("success");
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.valueOf("audio/mpeg"))
                .body(audio);
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
