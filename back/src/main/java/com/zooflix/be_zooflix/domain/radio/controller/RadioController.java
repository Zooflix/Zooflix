package com.zooflix.be_zooflix.domain.radio.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.zooflix.be_zooflix.domain.radio.service.RadioService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;
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
    public ResponseEntity<List<String[]>> selectCachedData() {
        List<String[]> list = radioService.getCachedNews();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(list);
    }

    @GetMapping(value = "/radio/tts", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "tts 출력")
    public ResponseEntity<List<String>> playRadio() {
        List<String[]> cachedList = radioService.getCachedNews();
        List<String> base64List = radioService.callTtsEndpoint(cachedList)
                .stream()
                .map(Base64.getEncoder()::encodeToString)
                .collect(Collectors.toList());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(base64List);
    }

}