package com.zooflix.be_zooflix.domain.stockSubscribe.controller;

import com.zooflix.be_zooflix.domain.stockSubscribe.dto.StockSubscribeDto;
import com.zooflix.be_zooflix.domain.user.dto.UserKeyProjection;
import com.zooflix.be_zooflix.domain.user.dto.UserUpdateDto;
import com.zooflix.be_zooflix.global.jwt.dto.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.zooflix.be_zooflix.domain.stockSubscribe.dto.request.*;
import com.zooflix.be_zooflix.domain.stockSubscribe.service.StockSubscribeService;
import jakarta.validation.Valid;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.zooflix.be_zooflix.global.result.ResultResponse;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor

@RequestMapping("/stock")
public class StockSubscribeController {
    private final StockSubscribeService service;

    /**
     * 3.1 주식 정기 구독
     *
     */
    @PostMapping("/subscribe")
    @Operation(summary = "주식 정기 구독")
    public ResponseEntity<ResultResponse<Integer>> insertStockSubscribe(@RequestBody @Valid AddStockSubscribeRequest request, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        if(customUserDetails == null) {
            throw new RuntimeException("토큰이 존재하지 않습니다.");
        }
        request.setUserId(customUserDetails.getUserId());
        int result =  service.postSubscribe(request);
        return ResponseEntity.ok(ResultResponse.res(HttpStatus.OK, HttpStatus.OK.toString(), result));
    }

    /**
     * 3.2 주식 정기 구독 취소
     *
     */
    @DeleteMapping("/subscribe/termination/{stockSubscribeNo}")
    @Operation(summary = "주식 정기 구독 해지")
    public ResponseEntity<ResultResponse<Integer>> terminationSubscribe(@PathVariable(name = "stockSubscribeNo") int stockSubscribeNo, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        if(customUserDetails == null) {
            throw new RuntimeException("토큰이 존재하지 않습니다.");
        }
        int result =  service.terminationSubscribe(stockSubscribeNo, customUserDetails.getUserNo());
        return ResponseEntity.ok(ResultResponse.res(HttpStatus.OK, HttpStatus.OK.toString(), result));
    }

    /**
     * 3.3 구독중인 주식 조회
     *
     */
    @GetMapping("/subscribe/list/{userId}")
    @Operation(summary = "구독중인 주식 목록 조회")
    public ResponseEntity<ResultResponse<List<StockSubscribeDto>>> subscribeList(@PathVariable(name = "userId") String userId, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        if(customUserDetails != null) {
            System.out.println("구독주식토큰존재함");
            userId = customUserDetails.getUserId();
        }
        System.out.println("구독주식목록아이디 : " + userId);
        List<StockSubscribeDto> subscribes = service.subscribeList(userId);
        return ResponseEntity.ok(ResultResponse.res(HttpStatus.OK, HttpStatus.OK.toString(), subscribes));
    }

    /**
     * 3.4 user api key 있는지 확인
     *
     */
    @GetMapping("/subscribe/checkApikey")
    @Operation(summary = "등록된 API key가 있는지 확인")
    public ResponseEntity<ResultResponse<Boolean>> checkUserApiKey(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        boolean apiKeyExists = service.checkApiKey(customUserDetails.getUserNo());
        return ResponseEntity.ok(ResultResponse.res(HttpStatus.OK, HttpStatus.OK.toString(), apiKeyExists));
    }

}
