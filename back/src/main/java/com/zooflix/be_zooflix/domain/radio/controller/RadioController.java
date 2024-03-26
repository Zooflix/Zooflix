package com.zooflix.be_zooflix.domain.radio.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
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

    @GetMapping(value = "/radio/summary")
    @Operation(summary = "크롤링-번역-요약")
    public ResponseEntity<Void> insertRadio() {
        String crawlingData = radioService.callCrawlingEndpoint();
        radioService.callSummaryEndpoint(crawlingData);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/radio/tts", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    @Operation(summary = "tts")
    public ResponseEntity<byte[]> playRadio() {
        byte[] audio = radioService.callTtsEndpoint();
        System.out.println("success");
        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.valueOf("audio/mpeg"))
                .body(audio);
    }


    //    @GetMapping(value="/radio/subtitle")
//    @Operation(summary = "자막")
//    public ResponseEntity<List<String>> getSubtitle() {
//        String crawlingResult = radioService.callCrawlingEndpoint();
//        List<String> summaryResult = radioService.callSummaryEndpoint(crawlingResult);
//        return ResponseEntity.ok().body(summaryResult);
//    }



//    /* 키워드 겟 */
//    @PostMapping("/radio/getKeyword")
//    @Operation(summary = "키워드 추출")
//    public ResponseEntity<?> getKeyword() {
//        String result = radioService.getKeyword();
//        System.out.println(result);
//        return ResponseEntity.ok().body(result);
//    }

}
