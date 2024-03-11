package com.zooflix.be_zooflix.domain.alarm.controller;

import com.zooflix.be_zooflix.domain.alarm.dto.response.FindListAlarmResponse;
import com.zooflix.be_zooflix.domain.alarm.repository.AlarmRepository;
import com.zooflix.be_zooflix.domain.alarm.service.AlarmService;
import com.zooflix.be_zooflix.global.result.ResultResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class AlarmController {

    private final AlarmService alarmService;
    private final AlarmRepository alarmRepository;

    //모든 Emitters를 저장하는 ConcurrentHashMap
    public static Map<Long, SseEmitter> sseEmitters = new ConcurrentHashMap<>();

    /*
     * 7.1 알림을 위한 SSE 연결
     * */
    @GetMapping(value = "/alarm/subscribe/{user_no}", produces = "text/event-stream;charset=UTF-8")
    public SseEmitter subscribe(@PathVariable(value = "user_id") String userId, @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId){
        return alarmService.subscribe(userId, lastEventId);
    }


    /*
     * 7.2 알림 전체 조회
     * */
    @GetMapping("/alarm/{userId}")
    public ResponseEntity<ResultResponse<List<FindListAlarmResponse>>> alarmList(@PathVariable(value = "user_id") String userId){
        List<FindListAlarmResponse> result = alarmService.findListAlarm(userId);
        return ResponseEntity.ok(ResultResponse.res(HttpStatus.OK, HttpStatus.OK.toString(), result));
    }

    /*
     * 7.3 알람 읽음 여부 수정
     * */
    @PutMapping("/alarm/{alarmNo}")
    public ResponseEntity<ResultResponse<String>> markAlarmAsRead(@PathVariable(value = "alarm_no") int alarmNo){
        alarmService.markAlarmAsRead(alarmNo);
        return ResponseEntity.ok(ResultResponse.res(HttpStatus.OK, "알림이 읽음 처리 되었습니다."));
    }



    /*
     * 7.4 알림 전체 지우기
     * */
    @DeleteMapping("/alarm")
    public FindListAlarmResponse deleteAlarm() throws IOException {
        return alarmService.deleteAlarm();
    }



}
