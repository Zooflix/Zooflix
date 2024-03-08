package com.zooflix.be_zooflix.domain.alarm.controller;

import com.zooflix.be_zooflix.domain.alarm.service.AlarmService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequiredArgsConstructor
@RequestMapping("/alarm")
@CrossOrigin("*")
public class AlarmController {

    private final AlarmService alarmService;

    public static Map<Long, SseEmitter> sseEmitters = new ConcurrentHashMap<>();

    /*
     * 7.1 알림을 위한 SSE 연결
     * */
    @GetMapping(value = "/subscribe/{user_no}", produces = "text/event-stream;charset=UTF-8")
    public SseEmitter subscribe(@PathVariable(value = "user_no") int userNo){
        return alarmService.subscribe(userNo);
    }


    /*
     * 7.2 알림 전체 조회
     * */
//    @GetMapping("/{userNo}")
//    public ResponseEntity<ResultResponse<List<FindListAlarmResponse>>> alarmList(@PathVariable(value = "userNo") int userNo){
//        List<FindList>
//    }

    /*
     * 7.3 알람 읽음 여부 수정
     * */

    /*
     * 7.4 알림 전체 지우기
     * */


}
