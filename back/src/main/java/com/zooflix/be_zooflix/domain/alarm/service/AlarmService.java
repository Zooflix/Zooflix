package com.zooflix.be_zooflix.domain.alarm.service;

import com.zooflix.be_zooflix.domain.alarm.dto.response.FindListAlarmResponse;
import com.zooflix.be_zooflix.domain.alarm.entity.Alarm;
import com.zooflix.be_zooflix.domain.alarm.repository.AlarmRepository;
import com.zooflix.be_zooflix.domain.alarm.repository.EmitterRepository;
import com.zooflix.be_zooflix.domain.user.entity.User;
import com.zooflix.be_zooflix.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AlarmService {

    private final UserRepository userRepository;
    private final EmitterRepository emitterRepository;
    private final AlarmRepository alarmRepository;

    private static final Long DEFAULT_TIMEOUT = 600L * 1000 * 60;

    public SseEmitter subscribe(int userNo, String lastEventId){
        SseEmitter emitter = emitterRepository.save(userNo, new SseEmitter(DEFAULT_TIMEOUT));

        emitter.onCompletion(() -> emitterRepository.deleteById(userNo));
        emitter.onTimeout(() -> emitterRepository.deleteById(userNo));
        emitter.onError((e) -> emitterRepository.deleteById(userNo));

        sendToClient(userNo, "EventStream Created. [userNo=" + userNo + "]", "SSE 접속 성공");

        return emitter;
    }

    //알림이 전송되어야 하는 곳에서 이 함수 실행시키기(구독하기 버튼 눌렀을 때 등등)
    //sse에도 해당 알림 내용 전달하고
    public <T> void customNotify(int userNo, T data, String comment, String type){
        //SSE에 해당 알림 전송
        sendToClient(userNo, data, comment, type);
    }

    public void notify(int userNo, Object data, String comment){
        sendToClient(userNo, data, comment);
    }

    private <T> void sendToClient(int userNo, T data, String comment, String type) {
        SseEmitter emitter = emitterRepository.get(userNo);
        if(emitter != null){
            try{
                emitter.send(SseEmitter.event()
                        .id(String.valueOf(userNo))
                        .name("sse")
                        .data(data)
                        .comment(comment));
            }catch (IOException e){
                emitterRepository.deleteById(userNo);
                emitter.completeWithError(e);
            }
        }
    }

    private void sendToClient(int userNo, Object data, String comment) {
        SseEmitter emitter = emitterRepository.get(userNo);
        if(emitter != null){
            try{
                emitter.send(SseEmitter.event()
                        .id(String.valueOf(userNo))
                        .name("sse")
                        .data(data)
                        .comment(comment));
            }catch (IOException e){
                emitterRepository.deleteById(userNo);
                emitter.completeWithError(e);
            }
        }
    }

    private SseEmitter createEmitter(int userNo) {
        SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);
        emitterRepository.save(userNo, emitter);

        emitter.onCompletion(() -> emitterRepository.deleteById(userNo));
        emitter.onTimeout(() -> emitterRepository.deleteById(userNo));
        return emitter;
    }



    private User validUser(int userNo) {
        return userRepository.findById(userNo).orElseThrow(() -> new RuntimeException("일치하는 사용자가 없습니다."));
    }

    //userNo(리시버)에게 온 알림 모두 확인
    public List<FindListAlarmResponse> findListAlarm(int userNo) {
        // 유저존재하는지 확인
        User receiverUser = validUser(userNo);

        //저장되어있던 알림 조회
        List<Alarm> alarmList = alarmRepository.findByReceiverUserOrderByCreatedAtDesc(receiverUser);

        //alarm에서 FindListAlarmResponse로 convert
        List<FindListAlarmResponse> alarmResponseList = new ArrayList<>();

        for(Alarm alarm : alarmList){
            System.out.println("alarm.getAlarmNo() = " + alarm.getAlarmNo());

            FindListAlarmResponse build = FindListAlarmResponse.builder()
                    .senederId(alarm.getSenderUser().getUserNo())
                    .nickname(alarm.getSenderUser().getUserName())
//                    .createdAt(alarm.getCreatedAt())
                    .type(alarm.getAlarmType())
                    .build();

            alarmResponseList.add(build);
        }
        return alarmResponseList;

    }


    public FindListAlarmResponse deleteAlarm() {
        try{
            List<Alarm> alarmList = alarmRepository.findAll();
            for(Alarm alarm : alarmList){
                alarmRepository.delete(alarm);
            }

            return new FindListAlarmResponse();
        }catch (Exception e){
            e.printStackTrace();
            return new FindListAlarmResponse();
        }
    }
}
