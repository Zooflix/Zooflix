package com.zooflix.be_zooflix.domain.radio.controller;


import com.zooflix.be_zooflix.domain.radio.service.RadioService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;
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
public class RadioController {

    private final RadioService radioService;

    @GetMapping(value = "/radio/cachedData")
    @Operation(summary = "캐싱 데이터 반환")
    public ResponseEntity<List<String[]>> insertNews() {
        List<String[]> list = radioService.getCachedList();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(list);
    }

    @GetMapping(value = "/radio/tts", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    @Operation(summary = "tts 출력")
    public ResponseEntity<List<byte[]>> playRadio() {
        List<String[]> list = radioService.getCachedList();
        List<byte[]> audioList = radioService.callTtsEndpoint(list);
        return ResponseEntity
                .status(HttpStatus.OK)
//                .contentType(MediaType.valueOf("audio/mpeg"))
                .body(audioList);
    }

}