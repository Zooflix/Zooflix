package com.zooflix.be_zooflix.domain.user.controller;

import com.zooflix.be_zooflix.domain.user.dto.UserInfoDto;
import com.zooflix.be_zooflix.domain.user.dto.UserLoginDto;
import com.zooflix.be_zooflix.domain.user.dto.UserSignupDto;
import com.zooflix.be_zooflix.domain.user.dto.UserUpdateDto;
import com.zooflix.be_zooflix.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "아이디 중복 체크")
    @PostMapping("/id-check")
    public ResponseEntity<String> selectIdCheck(@RequestBody UserSignupDto userSignupDto) {
        return ResponseEntity.ok(userService.postIdCheck(userSignupDto.getUserId()));
    }

    @Operation(summary = "이름 중복 체크")
    @PostMapping("/name-check")
    public ResponseEntity<String> selectNameCheck(@RequestBody UserSignupDto userSignupDto) {
        return ResponseEntity.ok(userService.postNameCheck(userSignupDto.getUserName()));
    }

    @Operation(summary = "회원가입")
    @PostMapping("/signup")
    public ResponseEntity<String> insertSignup(@RequestBody UserSignupDto userSignupDto) {
        return ResponseEntity.ok(userService.postSignup(userSignupDto));
    }

    @Operation(summary = "로그인")
    @PostMapping("/login")
    public ResponseEntity<String> selectLogin(@RequestBody UserLoginDto userLoginDto) {
        return ResponseEntity.ok(userService.postLogin(userLoginDto));
    }

    @Operation(summary = "회원정보 수정")
    @PutMapping("/update/{userId}")
    public ResponseEntity<String> updateUser(@PathVariable String userId, UserUpdateDto userUpdateDto) {
        return ResponseEntity.ok(userService.putUpdateUser(userId, userUpdateDto));
    }

    @Operation(summary = "예측 게시글 작성자 정보 조회")
    @GetMapping("/info/{userNo}")
    public ResponseEntity<UserInfoDto> selectInfo(@PathVariable int userNo) {
        return ResponseEntity.ok(userService.getUserInfo(userNo));
    }

    @Operation(summary = "주bti 저장")
    @PutMapping("/zbti/{userNo}/{userZbti}")
    public ResponseEntity<String> updateZbti(@PathVariable int userNo, @PathVariable String userZbti) {
        return ResponseEntity.ok(userService.putUpdateZbit(userNo, userZbti));
    }

    @Operation(summary = "회원탈퇴")
    @DeleteMapping("/delete/{userNo}")
    public ResponseEntity<String> deleteUser(@PathVariable int userNo) {
        return ResponseEntity.ok(userService.deleteUser(userNo));
    }

}
