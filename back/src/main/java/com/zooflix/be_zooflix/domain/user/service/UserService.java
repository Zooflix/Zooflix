package com.zooflix.be_zooflix.domain.user.service;

import com.zooflix.be_zooflix.domain.user.dto.UserLoginDto;
import com.zooflix.be_zooflix.domain.user.dto.UserSignupDto;
import com.zooflix.be_zooflix.domain.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public String postIdCheck(String userId) {

        return "중복";
    }

    public String postNameCheck(String userName) {

        return "중복";
    }

    public String postSignup(UserSignupDto userSignupDto) {
        return "성공";
    }

    public String postLogin(UserLoginDto userLoginDto) {
        return "로그인 성공";
    }
}
