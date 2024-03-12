package com.zooflix.be_zooflix.domain.myPage.controller;

import com.zooflix.be_zooflix.domain.myPage.dto.response.MyStockDto;
import com.zooflix.be_zooflix.domain.myPage.dto.response.MySubscribeDto;
import com.zooflix.be_zooflix.domain.myPage.dto.response.MyInfoDto;
import com.zooflix.be_zooflix.domain.myPage.dto.response.MyPredictionDto;
import com.zooflix.be_zooflix.domain.myPage.service.MyPageService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class MyPageController {
    private final MyPageService myPageService;

    public MyPageController(MyPageService myPageService) {
        this.myPageService = myPageService;
    }

    //내 예측 글 보기
    @GetMapping("/mypage/predict/{userNo}")
    public ResponseEntity<List<MyPredictionDto>> selectMyPrediction(HttpServletRequest request,@PathVariable int userNo) {
        List<MyPredictionDto> myPredict = myPageService.getMyPredictByNo(userNo);
        return ResponseEntity.ok(myPredict);
    }

    //내 정보 보기
    @GetMapping("/mypage/info/{userNo}")
    public ResponseEntity<MyInfoDto> selectMyInfo(HttpServletRequest request, @PathVariable int userNo) {
        MyInfoDto myInfo = myPageService.getMyInfo(userNo);
        return ResponseEntity.ok(myInfo);
    }

    //내가 구독 중인 회원 목록(닉네임, 온도)
    @GetMapping("/mypage/subscribe/{userNo}")
    public  ResponseEntity<List<MySubscribeDto>> selectMySubscribe(HttpServletRequest request, @PathVariable int userNo) {
        List<MySubscribeDto> mySubscribeList = myPageService.getMySubscribe(userNo);
        return ResponseEntity.ok(mySubscribeList);
    }

    //내가 정기 구독 중인 주식 목록(주식명,
    @GetMapping("/mypage/stock/{userNo}")
    public ResponseEntity<List<MyStockDto>> selectMyStockSubscribeList(HttpServletRequest request, @PathVariable int userNo) {
        List<MyStockDto> myStockDtoList = myPageService.getMyStockList(userNo);
        return ResponseEntity.ok(myStockDtoList);
    }
}
