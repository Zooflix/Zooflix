package com.zooflix.be_zooflix.domain.user.controller;

import com.zooflix.be_zooflix.domain.user.dto.UserLoginDto;
import com.zooflix.be_zooflix.domain.user.dto.UserSignupDto;
import com.zooflix.be_zooflix.domain.user.dto.UserUpdateDto;
import com.zooflix.be_zooflix.domain.user.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/id-check")
    public ResponseEntity<String> selectIdCheck(@RequestBody UserSignupDto userSignupDto) {
        return ResponseEntity.ok(userService.postIdCheck(userSignupDto.getUserId()));
    }

    @PostMapping("/name-check")
    public ResponseEntity<String> selectNameCheck(@RequestBody UserSignupDto userSignupDto) {
        return ResponseEntity.ok(userService.postNameCheck(userSignupDto.getUserName()));
    }

    @PostMapping("/signup")
    public ResponseEntity<String> insertSignup(@RequestBody UserSignupDto userSignupDto) {
        return ResponseEntity.ok(userService.postSignup(userSignupDto));
    }

    @PostMapping("/login")
    public ResponseEntity<String> selectLogin(@RequestBody UserLoginDto userLoginDto) {
        return ResponseEntity.ok(userService.postLogin(userLoginDto));
    }

    @PutMapping("/update/{userId}")
    public ResponseEntity<String> updateUser(@PathVariable String userId, UserUpdateDto userUpdateDto) {
        return ResponseEntity.ok(userService.putUpdateUser(userId, userUpdateDto));
    }

    @GetMapping("/info/{userId}")
    public ResponseEntity<> selectInfo(@PathVariable String userId) {

    }

}
