package com.zooflix.be_zooflix.domain.user.service;

import com.zooflix.be_zooflix.domain.alarm.repository.AlarmRepository;
import com.zooflix.be_zooflix.domain.predict.repository.PredictRepository;
import com.zooflix.be_zooflix.domain.report.repository.ReportRepository;
import com.zooflix.be_zooflix.domain.stockSubscribe.repository.StockSubscribeRepository;
import com.zooflix.be_zooflix.domain.user.dto.UserInfoDto;
import com.zooflix.be_zooflix.domain.user.dto.UserLoginDto;
import com.zooflix.be_zooflix.domain.user.dto.UserSignupDto;
import com.zooflix.be_zooflix.domain.user.dto.UserUpdateDto;
import com.zooflix.be_zooflix.domain.user.entity.User;
import com.zooflix.be_zooflix.domain.user.repository.UserRepository;
import com.zooflix.be_zooflix.domain.userSubscribe.repository.UserSubscribeRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final AlarmRepository alarmRepository;
    private final ReportRepository reportRepository;
    private final PredictRepository predictRepository;
    private final StockSubscribeRepository stockSubscribeRepository;
    private final UserSubscribeRepository userSubscribeRepository;

    public UserService(UserRepository userRepository, AlarmRepository alarmRepository, ReportRepository reportRepository, PredictRepository predictRepository, StockSubscribeRepository stockSubscribeRepository, UserSubscribeRepository userSubscribeRepository) {
        this.userRepository = userRepository;
        this.alarmRepository = alarmRepository;
        this.reportRepository = reportRepository;
        this.predictRepository = predictRepository;
        this.stockSubscribeRepository = stockSubscribeRepository;
        this.userSubscribeRepository = userSubscribeRepository;
    }

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // ID 체크
    public String postIdCheck(String userId) {
        if (userRepository.existsByUserId(userId)) {
            return "중복";
        } else {
            return "중복아님";
        }
    }

    // 닉네임 체크
    public String postNameCheck(String userName) {
        if (userRepository.existsByUserName(userName)) {
            return "중복";
        } else {
            return "중복아님";
        }
    }

    // 회원가입
    public String postSignup(UserSignupDto userSignupDto) {
        userSignupDto.setUserPw(passwordEncoder.encode(userSignupDto.getUserPw()));
        User user = userSignupDto.toEntity();
        userRepository.save(user);
        return "성공";
    }

    // 로그인
    public String postLogin(UserLoginDto userLoginDto) {
        User user = userRepository.findByUserId(userLoginDto.getUserId());
        if (user == null) {
            return "로그인 실패";
        }
        if (passwordEncoder.matches(userLoginDto.getUserPw(), user.getUserPw())) {
            return "로그인 성공";
        } else return "로그인 실패";

    }

    // 회원정보 수정
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
    public UserInfoDto getUserInfo(int userNo) {
        UserInfoDto userInfoDto = userRepository.getUserSubscriptionInfoByUserNo(userNo);
        int successCount = userInfoDto.getSuccessCount();
        int predictCount = userInfoDto.getPredictCount();
        if (successCount != 0 && predictCount != 0) { // 소수점 둘째 자리까지만.
            userInfoDto.setPredictPercent(Math.round(((((double) successCount / predictCount) * 100) * 100.0) / 100.0));
        }

        return userInfoDto;
    }

    public String putUpdateZbit(int userNo, String userZbti) {
        User user = userRepository.findMyInfo(userNo);
        user.userUpdateZbti(userZbti);

        userRepository.save(user);

        return "성공";
    }

    public String deleteUser(int userNo) {
        alarmRepository.deleteAllByUser(userNo);
        reportRepository.deleteAllByUser(userNo);
        predictRepository.deleteAllByUser(userNo);
        stockSubscribeRepository.deleteAllByUser(userNo);
        userSubscribeRepository.deleteAllByUser(userNo);
        userRepository.deleteById(userNo);
        return "회원 정보 삭제 성공";
    }
}
