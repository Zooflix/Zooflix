package com.zooflix.be_zooflix.domain.myPage.controller;

import com.zooflix.be_zooflix.domain.myPage.dto.response.MyStockDto;
import com.zooflix.be_zooflix.domain.myPage.dto.response.MySubscribeDto;
import com.zooflix.be_zooflix.domain.myPage.dto.response.MyInfoDto;
import com.zooflix.be_zooflix.domain.myPage.dto.response.MyPredictionDto;
import com.zooflix.be_zooflix.domain.myPage.service.MyPageService;
import com.zooflix.be_zooflix.domain.stockSubscribe.dto.StockSubscribeDto;
import com.zooflix.be_zooflix.domain.stockSubscribe.service.StockSubscribeService;
import com.zooflix.be_zooflix.domain.user.dto.UserDto;
import com.zooflix.be_zooflix.global.jwt.dto.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class MyPageController {
    private final MyPageService myPageService;
    public MyPageController(MyPageService myPageService, StockSubscribeService stockSubscribeService) {
        this.myPageService = myPageService;
    }

    @Operation(summary = "내 예측 글 보기")
    @GetMapping("/my-page/predict")
    public ResponseEntity<List<MyPredictionDto>> selectMyPrediction(@AuthenticationPrincipal CustomUserDetails customUserDetails) {

        if(customUserDetails == null) {
            throw new RuntimeException("토큰이 존재하지 않습니다.");
        }

        List<MyPredictionDto> myPredict = myPageService.getMyPredictByNo(customUserDetails.getUserNo());

        return ResponseEntity.ok(myPredict);
    }

    @Operation(summary = "내 정보 보기")
    @GetMapping("/my-page/info")
    public ResponseEntity<MyInfoDto> selectMyInfo(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        if(customUserDetails == null) {
            throw new RuntimeException("토큰이 존재하지 않습니다.");
        }
        MyInfoDto myInfo = myPageService.getMyInfo(customUserDetails.getUserNo());
        return ResponseEntity.ok(myInfo);
    }

    @Operation(summary = "내가 구독 중인 회원 목록(구독인덱스, 닉네임, 온도)")
    @GetMapping("/my-page/subscribe")
    public  ResponseEntity<List<MySubscribeDto>> selectMySubscribe(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        if(customUserDetails == null) {
            throw new RuntimeException("토큰이 존재하지 않습니다.");
        }
        List<MySubscribeDto> mySubscribeList = myPageService.getMySubscribe(customUserDetails.getUserNo());
        return ResponseEntity.ok(mySubscribeList);
    }

    //*********************************유저 페이지 용 *********************************
    @Operation(summary = "유저 예측 글 보기")
    @GetMapping("/my-page/predict/{userNo}")
    public ResponseEntity<List<MyPredictionDto>> selectUserPrediction(@PathVariable int userNo) {
        return ResponseEntity.ok(myPageService.getMyPredictByNo(userNo));
    }

    @Operation(summary = "유저 정보 보기")
    @GetMapping("/my-page/info/{userNo}")
    public ResponseEntity<MyInfoDto> selectUserInfo(@PathVariable int userNo) {
        return ResponseEntity.ok(myPageService.getMyInfo(userNo));
    }

    @Operation(summary = "유저가 구독 중인 회원 목록(구독인덱스, 닉네임, 온도)")
    @GetMapping("/my-page/subscribe/{userNo}")
    public ResponseEntity<List<MySubscribeDto>> selectUserSubscribe(@PathVariable int userNo) {
        List<MySubscribeDto> mySubscribeList = myPageService.getMySubscribe(userNo);
        return ResponseEntity.ok(mySubscribeList);
    }

}
