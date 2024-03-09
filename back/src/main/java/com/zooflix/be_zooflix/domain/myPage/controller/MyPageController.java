package com.zooflix.be_zooflix.domain.myPage.controller;

import com.zooflix.be_zooflix.domain.myPage.dto.response.MyPredictionDto;
import com.zooflix.be_zooflix.domain.predict.service.PredictService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Slf4j
@Controller
@RequestMapping("mypage")
@RequiredArgsConstructor
public class MyPageController {
    private final PredictService predictService;

    @GetMapping("")
    public ResponseEntity<List<MyPredictionDto>> getMyPrediction(@PathVariable int userNo) {
        log.debug("getMyPrediction");
        return ResponseEntity.ok().body(predictService.getMyPredictByNo(userNo));
    }
}
