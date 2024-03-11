package com.zooflix.be_zooflix.domain.stockSubscribe.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.zooflix.be_zooflix.domain.stockSubscribe.dto.request.*;
import com.zooflix.be_zooflix.domain.stockSubscribe.service.StockSubscribeService;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

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
    @Operation(summary = "주식 정기 구독")
    public ResponseEntity<ResultResponse<Integer>> insertStockSubscribe(@RequestBody @Valid AddStockSubscribeRequest request) {
        int result =  service.postSubscribe(request);
        return ResponseEntity.ok(ResultResponse.res(HttpStatus.OK, HttpStatus.OK.toString(), result));
    }

    /**
     * 3.2 주식 정기 구독 취소
     *
     */
    @DeleteMapping("/stock/subscribe/termination")
    @Operation(summary = "주식 정기 구독 해지")
    public ResponseEntity<ResultResponse<Integer>> terminationSubscribe(@PathVariable(name = "stockSubscribeNo") int stockSubscribeNo) {
        int result =  service.terminationSubscribe(stockSubscribeNo);
        return ResponseEntity.ok(ResultResponse.res(HttpStatus.OK, HttpStatus.OK.toString(), result));
    }


}
