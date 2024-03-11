package com.zooflix.be_zooflix.domain.alarm.service;

import com.zooflix.be_zooflix.domain.alarm.repository.AlarmRepository;
import com.zooflix.be_zooflix.domain.alarm.repository.EmitterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
@RequiredArgsConstructor
public class AlarmService {

//    private final UserRepository userRepository;
    private final EmitterRepository emitterRepository;
    private final AlarmRepository alarmRepository;

    private static final Long DEFAULT_TIMEOUT = 600L * 1000 * 60;

    public SseEmitter subscribe(int userNo){
        SseEmitter emitter = createEmitter(userNo);
        sendToClient(userNo, "EventStream Created. [userNo=" + userNo + "]", "sse 접속성공");
        return emitter;
    }


    //알림이 전송되어야 하는 곳에서 이 함수 실행시키기(구독하기 버튼 눌렀을 때 등등)
    //sse에도 해당 알림 내용 전달하고
    public <T> void customNotify(int userNo, T data, String comment, String type){
        //SSE에 해당 알림 전송
        sendToClient(userNo, data, comment, type);
    }

    public void notify(int userNo, Object data, String comment){
//        sendToClient(userNo, data, comment);
    }

    private <T> void sendToClient(int userNo, T data, String comment, String type) {
    }

    private void sendToClient(int userNo, String s, String sse_접속성공) {
    }

    private SseEmitter createEmitter(int userNo) {
    }
}
