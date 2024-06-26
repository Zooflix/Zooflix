package com.zooflix.be_zooflix.domain.alarm.service;

import com.zooflix.be_zooflix.domain.alarm.dto.response.FindListAlarmKeyProjectionResponse;
import com.zooflix.be_zooflix.domain.alarm.dto.response.FindListAlarmResponse;
import com.zooflix.be_zooflix.domain.alarm.entity.Alarm;
import com.zooflix.be_zooflix.domain.alarm.entity.AlarmTypeStatus;
import com.zooflix.be_zooflix.domain.alarm.repository.AlarmRepository;
import com.zooflix.be_zooflix.domain.alarm.repository.EmitterRepository;
import com.zooflix.be_zooflix.domain.predict.entity.Predict;
import com.zooflix.be_zooflix.domain.user.entity.User;
import com.zooflix.be_zooflix.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AlarmService {

    private final EmitterRepository emitterRepository;
    private final AlarmRepository alarmRepository;

    private static final Long DEFAULT_TIMEOUT = 600L * 1000 * 60;

    //sse 연결
    public SseEmitter subscribe(String userId, String lastEventId){
        String emitterId = makeTimeIncludeId(userId);

        SseEmitter emitter = null;

        if(emitterRepository.get(userId) != null){
            emitterRepository.deleteById(userId);
            emitterRepository.save(emitterId, new SseEmitter(DEFAULT_TIMEOUT));
        }else{
            emitter = emitterRepository.save(emitterId, new SseEmitter(DEFAULT_TIMEOUT));
        }

        //연결 종료 처리
        emitter.onCompletion(() -> emitterRepository.deleteById(emitterId));
        emitter.onTimeout(() -> emitterRepository.deleteById(emitterId));
        emitter.onError((e) -> emitterRepository.deleteById(emitterId));
        
        //503오류가 발생하지 않도록 더미데이터 보내기
        String eventId = makeTimeIncludeId(userId);
        sendNotification(emitter, eventId, emitterId, "EventStream Created. [userId=" + userId + "]");

        if (hasLostData(lastEventId)){
            sendLostData(lastEventId, userId, emitterId, emitter);
        }
        return emitter;
    }

    //유실데이터 전송
    private void sendLostData(String lastEventId, String userId, String emitterId, SseEmitter emitter) {
        Map<String, Object> eventCaches = emitterRepository.findAllEventCacheStartWithByEmail(String.valueOf(userId));
        eventCaches.entrySet().stream()
                .filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
                .forEach(entry -> sendNotification(emitter, entry.getKey(), emitterId,entry.getValue()));
    }

    //유실데이터 있는지 여부
    private boolean hasLostData(String lastEventId) {
        return !lastEventId.isEmpty();
    }

    //단순 알림 전송 - 더미데이터 전송할때 사용
    private void sendNotification(SseEmitter emitter, String eventId, String emitterId,  Object data) {
        try{
            emitter.send(SseEmitter.event()
                    .id(eventId)
                    .name("sse")
                    .data(data, MediaType.APPLICATION_JSON));
        }catch (IOException e){
            emitterRepository.deleteById(emitterId);
            throw new RuntimeException("연결 오류!");
        }
    }

    //시간이 포함된 아이디
    private String makeTimeIncludeId(String userId) {
        return userId + "_" + System.currentTimeMillis();
    }

    //특정 유저에게 알림 전송
    public void send(User receiver, String content, AlarmTypeStatus type){
        String userId = receiver.getUserId();
        Alarm alarm = createAlarm(receiver, content, type);

        Map<String, Object> sseEmitters = emitterRepository.findAllEventCacheStartWithByEmail(userId);
        sseEmitters.forEach(
                (key, emitter) -> {
                    emitterRepository.saveEventCache(key, alarm);
                    sendToClient((SseEmitter) emitter, key, alarm);
                }
        );
        //알람 db에 저장
    }

    //=============
    //타입별 알림 생성
    private Alarm createAlarm(User receiver, String content, AlarmTypeStatus type) {
        // 구독
        if(type == AlarmTypeStatus.SUBSCRIBE){
            return Alarm.builder()
                    .receiverUser(receiver)
                    .content(content)
                    .alarmType(type)
                    .isRead(false)
                    .createdAt(LocalDateTime.now())
                    .build();

            // 내가 구독한 사람이 글 쓴 경우
        }else if(type == AlarmTypeStatus.WRITE) {
            return Alarm.builder()
                    .receiverUser(receiver)
                    .content(content)
                    .alarmType(type)
                    .isRead(false)
                    .createdAt(LocalDateTime.now())
                    .build();

            //내가 구독할 때
        }else if(type == AlarmTypeStatus.USER){
            return Alarm.builder()
                    .receiverUser(receiver)
                    .content(content)
                    .alarmType(type)
                    .isRead(false)
                    .createdAt(LocalDateTime.now())
                    .build();

            // 내가 구독한 사람이 매매한 경우
        }else if(type == AlarmTypeStatus.TRADING){
            return Alarm.builder()
                    .receiverUser(receiver)
                    .content(content)
                    .alarmType(type)
                    .isRead(false)
                    .createdAt(LocalDateTime.now())
                    .build();

            //내 글의 예측 성공 여부
        }else if(type == AlarmTypeStatus.RESULT){
            return Alarm.builder()
                    .receiverUser(receiver)
                    .content(content)
                    .alarmType(type)
                    .isRead(false)
                    .createdAt(LocalDateTime.now())
                    .build();


            //내일이 매매일인 경우
        }else if(type == AlarmTypeStatus.TOMORROW){
            return Alarm.builder()
                    .receiverUser(receiver)
                    .content(content)
                    .alarmType(type)
                    .isRead(false)
                    .createdAt(LocalDateTime.now())
                    .build();
        }else{
            throw new IllegalArgumentException("Invalid alarm type: " + type);
        }
    }


    //알림 전송
    private void sendToClient(SseEmitter emitter, String id, Object data) {
        try{
            emitter.send(SseEmitter.event()
                    .id(id)
                    .name("sse")
                    .data(data, MediaType.APPLICATION_JSON)
                    .reconnectTime(0));

            emitter.complete();

            emitterRepository.deleteById(id);

        } catch (IOException e) {
            emitterRepository.deleteById(id);
            throw new RuntimeException(e);
        }
    }



    //알림비우기
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

    //읽음 확인 여부 체크
    public void markAlarmAsRead(int alarmNo){
        Alarm alarm = alarmRepository.findById((long) alarmNo)
                .orElseThrow(()-> new RuntimeException("해당 알람을 찾을 수 없습니다."));

        alarm.setIsRead(true);
        alarmRepository.save(alarm);
    }

    //receiver에게 온 모든 알림 목록 보여주기
    public List<FindListAlarmKeyProjectionResponse> findListAlarm(String userId) {
        List<FindListAlarmKeyProjectionResponse> alarmResponseList = alarmRepository.findAlarmsByUserIdWithSubscribeName(userId);

        return alarmResponseList;

    }

}
