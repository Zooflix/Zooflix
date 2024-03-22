package com.zooflix.be_zooflix.domain.userSubscribe.service;

import com.zooflix.be_zooflix.domain.user.repository.UserRepository;
import com.zooflix.be_zooflix.domain.userSubscribe.dto.UserSubscribeReqDto;
import com.zooflix.be_zooflix.domain.userSubscribe.entity.UserSubscribe;
import com.zooflix.be_zooflix.domain.userSubscribe.repository.UserSubscribeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class UserSubscribeService {

    private final UserSubscribeRepository userSubscribeRepository;
    private  final UserRepository userRepository;
    @Autowired
    public UserSubscribeService(UserSubscribeRepository userSubscribeRepository, UserRepository userRepository) {
        this.userSubscribeRepository = userSubscribeRepository;
        this.userRepository = userRepository;
    }

    //유저 구독 추가
    public UserSubscribe postUserSubscribe(UserSubscribeReqDto dto) {
        UserSubscribe userSubscribe = UserSubscribe.builder()
                .user(userRepository.findMyInfo(dto.getUserNo()))
                .subscribeUserNo(dto.getSubscribeUserNo())
                .subscribeCreate(LocalDate.now())
                .build();
        return userSubscribeRepository.save(userSubscribe);
    }

    //유저 구독 취소
    public void deleteUserSubscribe(int subscribeNo) {
        userSubscribeRepository.deleteById(subscribeNo);
    }

}
