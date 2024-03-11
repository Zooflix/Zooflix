package com.zooflix.be_zooflix.domain.myPage.controller;

import com.zooflix.be_zooflix.domain.myPage.dto.response.MyPredictionDto;
import com.zooflix.be_zooflix.domain.myPage.service.MyPageService;
import com.zooflix.be_zooflix.domain.predict.service.PredictService;
import com.zooflix.be_zooflix.domain.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class MyPageController {
    private final MyPageService myPageService;

    public MyPageController(MyPageService myPageService) {
        this.myPageService = myPageService;
    }

    @GetMapping("/mypage/{userNo}")
    public ResponseEntity<List<MyPredictionDto>> getMyPrediction(HttpServletRequest request,@PathVariable int userNo) {
        List<MyPredictionDto> myPredict = myPageService.getMyPredictByNo(userNo);
        return ResponseEntity.ok(myPredict);
    }


}
