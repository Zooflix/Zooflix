package com.zooflix.be_zooflix.domain.user.controller;

import com.zooflix.be_zooflix.domain.user.dto.UserLoginDto;
import com.zooflix.be_zooflix.domain.user.dto.UserSignupDto;
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
    public ResponseEntity<String> selectIdCheck(@RequestBody String userId) {
        return ResponseEntity.ok(userService.postIdCheck(userId));
    }

    @PostMapping("/name-check")
    public ResponseEntity<String> selectNameCheck(@RequestBody String userName) {
        return ResponseEntity.ok(userService.postNameCheck(userName));
    }

    @PostMapping("/signup")
    public ResponseEntity<String> insertSignup(@RequestBody UserSignupDto userSignupDto) {
        return ResponseEntity.ok(userService.postSignup(userSignupDto));
    }

    @PostMapping("/login")
    public ResponseEntity<String> selectLogin(@RequestBody UserLoginDto userLoginDto) {
        return ResponseEntity.ok(userService.postLogin(userLoginDto));
    }
}
