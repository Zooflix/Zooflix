package com.zooflix.be_zooflix.domain.userSubscribe.controller;

import com.zooflix.be_zooflix.domain.userSubscribe.dto.UserSubscribeReqDto;
import com.zooflix.be_zooflix.domain.userSubscribe.entity.UserSubscribe;
import com.zooflix.be_zooflix.domain.userSubscribe.service.UserSubscribeService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserSubscribeController {

    private final UserSubscribeService userSubscribeService;

    @Autowired
    public UserSubscribeController(UserSubscribeService userSubscribeService) {
        this.userSubscribeService = userSubscribeService;
    }

    @Operation(summary = "유저 구독하기")
    @PostMapping("/user-subscribe")
    public ResponseEntity<?> insertUserSubscribe(@RequestBody UserSubscribeReqDto userSubscribeReqDto) {
        UserSubscribe userSubscribe = userSubscribeService.postUserSubscribe(userSubscribeReqDto);
        return ResponseEntity.ok(userSubscribe);
    }

    @Operation(summary = "유저 구독 취소")
    @DeleteMapping("/user-subscribe/{subscribeNo}")
    public ResponseEntity<?> deleteUserSubscribe(@PathVariable int subscribeNo){
        userSubscribeService.deleteUserSubscribe(subscribeNo);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
