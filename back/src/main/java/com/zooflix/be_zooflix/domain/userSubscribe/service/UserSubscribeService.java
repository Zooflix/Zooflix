package com.zooflix.be_zooflix.domain.userSubscribe.service;

import com.zooflix.be_zooflix.domain.alarm.entity.Alarm;
import com.zooflix.be_zooflix.domain.alarm.entity.AlarmTypeStatus;
import com.zooflix.be_zooflix.domain.alarm.repository.AlarmRepository;
import com.zooflix.be_zooflix.domain.alarm.service.AlarmService;
import com.zooflix.be_zooflix.domain.user.entity.User;
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
    private final UserRepository userRepository;
    private final AlarmService alarmService;
    private final AlarmRepository alarmRepository;

    @Autowired
    public UserSubscribeService(UserSubscribeRepository userSubscribeRepository, UserRepository userRepository, AlarmService alarmService, AlarmRepository alarmRepository) {
        this.userSubscribeRepository = userSubscribeRepository;
        this.userRepository = userRepository;
        this.alarmService = alarmService;
        this.alarmRepository = alarmRepository;
    }

    //유저 구독 추가
    public UserSubscribe postUserSubscribe(UserSubscribeReqDto dto) {
        //구독하는 사용자 정보 가져오기
        User subscribingUser = userRepository.findMyInfo(dto.getUserNo());

        UserSubscribe userSubscribe = UserSubscribe.builder()
                .user(userRepository.findMyInfo(dto.getUserNo()))
                .subscribeUserNo(dto.getSubscribeUserNo())
                .subscribeCreate(LocalDate.now())
                .build();

        User alarmReceiver = userRepository.findMyInfo(userSubscribe.getSubscribeUserNo());

        String content = userSubscribe.getUser().getUserName() + "님이 회원님을 구독했습니다.";
//        String content = userSubscribe.getUser() + "님이 회원님을 구독했습니다.";
        alarmService.send(alarmReceiver, content, AlarmTypeStatus.USER);

        Alarm alarm = new Alarm();
        alarm.setReceiverUser(alarmReceiver);
        alarm.setContent(content);
        alarm.setAlarmType(AlarmTypeStatus.USER);
        alarm.setIsRead(false);
        alarmRepository.save(alarm);
        System.out.println("성공적 알람 ok");

        return userSubscribeRepository.save(userSubscribe);
    }

    //유저 구독 취소
    public void deleteUserSubscribe(int subscribeNo){
        userSubscribeRepository.deleteById(subscribeNo);

    }

}
