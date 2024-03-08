package com.zooflix.be_zooflix.domain.myPage.service;

import com.zooflix.be_zooflix.domain.myPage.dto.response.MyInfoDto;
import com.zooflix.be_zooflix.domain.myPage.repository.MyPageRepository;
import com.zooflix.be_zooflix.domain.predict.repository.PredictRepository;
import com.zooflix.be_zooflix.domain.stockSubscribe.repository.StockSubscribeRepository;
import com.zooflix.be_zooflix.domain.user.entity.User;
import com.zooflix.be_zooflix.domain.user.repository.UserRepository;
import com.zooflix.be_zooflix.domain.userSubscribe.repository.UserSubscribeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MyPageService {

    private final MyPageRepository myPageRepository;
    private final UserRepository userRepository;
    private final PredictRepository predictRepository;
    private final StockSubscribeRepository stockSubscribeRepository;
    private final UserSubscribeRepository userSubscribeRepository;

    // 내 정보
//    public MyInfoDto getMyInfo(int userNo) {
//        User user = myPageRepository.findMyInfo(userNo);   //Optional 쓰던데... 어떻게 쓰나..
//        if (user == null) {
//            throw new NullPointerException();
//        }
//
//    }

}
