package com.zooflix.be_zooflix.domain.alarm.repository;

import com.zooflix.be_zooflix.domain.alarm.entity.Alarm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class EmitterRepository {

    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();
    private final Map<String, Object> eventCache = new ConcurrentHashMap<>();

    public SseEmitter save(String userId, SseEmitter emitter){
        emitters.put(userId, emitter);
        return emitter;
    }

    public void deleteById(String userId){
        emitters.remove(userId);
    }

    public SseEmitter get(String userId){
        return emitters.get(userId);
    }


    public Map<String, Object> findAllEventCacheStartWithByEmail(String userId) {
        return emitters.entrySet().stream()
                .filter(entry -> entry.getKey().startsWith(userId))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    public void saveEventCache(String eventCacheId, Object event) {
        eventCache.put(eventCacheId, event);
    }
}
