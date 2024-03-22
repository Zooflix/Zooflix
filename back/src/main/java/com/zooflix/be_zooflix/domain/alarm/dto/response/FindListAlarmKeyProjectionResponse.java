package com.zooflix.be_zooflix.domain.alarm.dto.response;

import com.zooflix.be_zooflix.domain.alarm.entity.AlarmTypeStatus;

import java.time.LocalDateTime;

public interface FindListAlarmKeyProjectionResponse {
    Integer getSenederId();

    String getNickname();

    LocalDateTime getCreatedAt();

    AlarmTypeStatus getType();

    Boolean getIsRead();
}
