package com.zooflix.be_zooflix.domain.radio.controller;


import com.zooflix.be_zooflix.domain.radio.service.RadioService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class RadioController {

    private final RadioService radioService;

    @GetMapping(value = "/radio/summary")
    @Operation(summary = "크롤링-번역-요약-레디스")
    public ResponseEntity<Void> insertNews() {
        radioService.postNews();
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
