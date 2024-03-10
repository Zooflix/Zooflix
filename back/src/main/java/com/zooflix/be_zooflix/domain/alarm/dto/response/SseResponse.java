package com.zooflix.be_zooflix.domain.alarm.dto.response;

import com.zooflix.be_zooflix.domain.alarm.entity.AlarmTypeStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class SseResponse {

    int senderId;

    String nickname;

    LocalDateTime createdAt;

    AlarmTypeStatus type;
}
