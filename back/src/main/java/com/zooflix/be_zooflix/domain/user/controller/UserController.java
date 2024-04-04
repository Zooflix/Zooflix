package com.zooflix.be_zooflix.domain.user.controller;

import com.zooflix.be_zooflix.domain.user.dto.UserInfoDto;
import com.zooflix.be_zooflix.domain.user.dto.UserLoginDto;
import com.zooflix.be_zooflix.domain.user.dto.UserSignupDto;
import com.zooflix.be_zooflix.domain.user.dto.UserUpdateDto;
import com.zooflix.be_zooflix.domain.user.service.UserService;
import com.zooflix.be_zooflix.global.jwt.dto.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

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

    @Operation(summary = "수정용 회원정보 가져오기")
    @GetMapping("/update/info")
    public ResponseEntity<UserUpdateDto> selectUpdateUser(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(userService.getUpdateUserInfo(customUserDetails.getUserId()));
    }

    @Operation(summary = "회원정보 수정")
    @PutMapping("/update")
    public ResponseEntity<String> updateUser(@RequestBody UserUpdateDto userUpdateDto, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        if(customUserDetails == null) {
            throw new RuntimeException("토큰이 존재하지 않습니다.");
        }
        return ResponseEntity.ok(userService.putUpdateUser(customUserDetails.getUserId(), userUpdateDto));
    }

    @Operation(summary = "예측 게시글 작성자 정보 조회")
    @GetMapping("/info/{userNo}")
    public ResponseEntity<UserInfoDto> selectInfo(@PathVariable int userNo) {
        return ResponseEntity.ok(userService.getUserInfo(userNo));
    }

    @Operation(summary = "주bti 저장")
    @PutMapping("/zbti/{userZbti}")
    public ResponseEntity<String> updateZbti(@PathVariable String userZbti, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(userService.putUpdateZbit(customUserDetails.getUserNo(), userZbti));
    }

    @Operation(summary = "회원탈퇴")
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUser(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ResponseEntity.ok(userService.deleteUser(customUserDetails.getUserNo()));
    }

    @Operation(summary = "토큰 재발급")
    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {
        return userService.tokenReissue(request, response);
    }

}
