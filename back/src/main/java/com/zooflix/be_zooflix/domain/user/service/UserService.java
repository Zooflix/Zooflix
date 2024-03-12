package com.zooflix.be_zooflix.domain.user.service;

import com.zooflix.be_zooflix.domain.user.dto.UserLoginDto;
import com.zooflix.be_zooflix.domain.user.dto.UserNameTemperatureDto;
import com.zooflix.be_zooflix.domain.user.dto.UserSignupDto;
import com.zooflix.be_zooflix.domain.user.entity.User;
import com.zooflix.be_zooflix.domain.user.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String postIdCheck(String userId) {
        if (userRepository.existsByUserId(userId)) {
            return "중복";
        } else {
            return "중복아님";
        }
    }

    public String postNameCheck(String userName) {
        if (userRepository.existsByUserName(userName)) {
            return "중복";
        } else {
            return "중복아님";
        }
    }

    public String postSignup(UserSignupDto userSignupDto) {
        userSignupDto.setUserPw(passwordEncoder.encode(userSignupDto.getUserPw()));
        User user = userSignupDto.toEntity();
        userRepository.save(user);
        return "성공";
    }

    public String postLogin(UserLoginDto userLoginDto) {
        User user = userRepository.findByUserId(userLoginDto.getUserId());
        if (user == null) {
            return "로그인 실패";
        }
        if (passwordEncoder.matches(userLoginDto.getUserPw(), user.getUserPw())) {
            return "로그인 성공";
        } else return "로그인 실패";

    }

//    // 유저의 닉네임을 통해 유저 닉네임, 온도 가져오기
//    public UserNameTemperatureDto getUserByName(String userName) {
//        UserNameTemperatureDto userNameTemp = userRepository.findByUserName(userName);
//        if(userNameTemp == null) {
//            throw new NullPointerException("getUserByName : 존재하지 않는 유저 입니다.");
//        }
//
//        return userNameTemp;
//    }
}
