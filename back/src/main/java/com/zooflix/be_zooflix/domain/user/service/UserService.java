package com.zooflix.be_zooflix.domain.user.service;

import com.zooflix.be_zooflix.domain.user.dto.UserInfoDto;
import com.zooflix.be_zooflix.domain.user.dto.UserLoginDto;
import com.zooflix.be_zooflix.domain.user.dto.UserSignupDto;
import com.zooflix.be_zooflix.domain.user.dto.UserUpdateDto;
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

    public String putUpdateUser(String userId, UserUpdateDto userUpdateDto) {
        User user = userRepository.findByUserId(userId);

        if (userUpdateDto.getUserAppKey() != null) {
            user.userUpdateKey(
                    userUpdateDto.getUserName(),
                    userUpdateDto.getUserPw(),
                    userUpdateDto.getUserAppKey(),
                    userUpdateDto.getUserSecretKey(),
                    userUpdateDto.getUserAccount()
            );
        } else {
            user.userUpdate(
                    userUpdateDto.getUserName(),
                    userUpdateDto.getUserPw()
            );
        }

        userRepository.save(user);
        
        return "회원정보 수정 완료";
    }

    // userId로 user 정보 가져오기. (구독 수, 구독자 수 포함)
    public UserInfoDto getUserInfo(String userId) {
        UserInfoDto userInfoDto = userRepository.getUserSubscriptionInfoByUserNo(userId);
        userInfoDto.setPredictPercent(10.2d);
        return userInfoDto;
    }
}
