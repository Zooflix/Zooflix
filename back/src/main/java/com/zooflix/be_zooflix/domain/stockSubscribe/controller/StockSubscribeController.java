package com.zooflix.be_zooflix.domain.stockSubscribe.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.zooflix.be_zooflix.domain.stockSubscribe.dto.request.*;
import com.zooflix.be_zooflix.domain.stockSubscribe.service.StockSubscribeService;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.zooflix.be_zooflix.global.result.ResultResponse;

@RestController
@Slf4j
@RequiredArgsConstructor
@CrossOrigin("*")

public class StockSubscribeController {
    private final StockSubscribeService service;

    /**
     * 3.1 주식 정기 구독
     *
     */
    @PostMapping("/stock/subscribe")
    public ResponseEntity<ResultResponse<Integer>> insertStockSubscribe(@RequestBody @Valid AddStockSubscribeRequest request) {
        int result =  service.postSubscribe(request);
        return ResponseEntity.ok(ResultResponse.res(HttpStatus.OK, HttpStatus.OK.toString(), result));
    }

}
