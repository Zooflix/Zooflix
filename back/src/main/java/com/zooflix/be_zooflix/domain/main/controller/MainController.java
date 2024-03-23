package com.zooflix.be_zooflix.domain.main.controller;

import com.zooflix.be_zooflix.domain.main.dto.MainDto;
import com.zooflix.be_zooflix.domain.main.service.MainService;
import com.zooflix.be_zooflix.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/main")
public class MainController {
    private final MainService mainService;

    /**
     * 2.1 메인페이지 - 랭킹 데이터 조회
     *
     */
    @GetMapping("/ranking")
    @Operation(summary = "메인페이지 랭킹 데이터 조회")
    public ResponseEntity<ResultResponse<MainDto>> mainRankingData() {
        MainDto mainData = mainService.mainRankingData();

        return ResponseEntity.ok(ResultResponse.res(HttpStatus.OK, HttpStatus.OK.toString(), mainData));
    }
}
