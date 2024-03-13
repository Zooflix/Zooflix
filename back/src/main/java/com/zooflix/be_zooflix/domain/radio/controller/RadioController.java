package com.zooflix.be_zooflix.domain.radio.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
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

    /* 라디오봇 */
    @PostMapping("/radio")
    @Operation(summary = "라디오봇")
    public ResponseEntity<?> playRadio() throws JsonProcessingException {
        String result = radioService.getRadio();
        return ResponseEntity.ok().body(result);
    }
}
