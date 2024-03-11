package com.zooflix.be_zooflix.domain.alarm.dto.response;

import com.zooflix.be_zooflix.domain.alarm.entity.AlarmTypeStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class FindListAlarmResponse {
    int senederId;

    String nickname;

    LocalDateTime createdAt;

    AlarmTypeStatus type;
}
