package com.zooflix.be_zooflix.domain.alarm.controller;

import com.zooflix.be_zooflix.domain.alarm.service.AlarmService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/alarm")
@CrossOrigin("*")
public class AlarmController {

    private final AlarmService alarmService;

    public AlarmService getAlarmService() {
        return alarmService;
    }

    /*
     * 7.1 알림을 위한 SSE 연결
     * */

    /*
     * 7.2 알림 전체 조회
     * */

    /*
     * 7.3 알람 읽음 여부 수정
     * */

    /*
     * 7.4 알림 전체 지우기
     * */


}
