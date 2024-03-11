package com.zooflix.be_zooflix.domain.alarm.entity;

import com.zooflix.be_zooflix.domain.user.entity.User;
import com.zooflix.be_zooflix.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Table(name = "alarm")
@Builder
public class Alarm extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alarm_no", nullable = false)
    private int alarmNo; //알람 id

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_no", nullable = false)
    private User receiverUser; //알림을 받는 사용자 -> receiver

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subscribe_id")
    private User senderUser; //내가 구독한 사람의 id(알림을 보내는 사람) -> sender

    @Enumerated(EnumType.STRING)
    @Column(name = "alarm_type", nullable = false)
    private AlarmTypeStatus alarmType; //알림 종류

    @Column(name = "alarm_content")
    private String content; // 알림 내용

    @Column(name = "alarm_create")
    private LocalDateTime createdAt; // 알림 발생 시점

    @Column(name = "is_read", nullable = false)
    @Setter
    private Boolean isRead; // 알림 확인 여부

    public Alarm() {

    }


    public static Alarm createAlarm(User receiverUser, User senderUser, AlarmTypeStatus alarmType, String content, Boolean isRead) {
        Alarm alarm = new Alarm();

        alarm.senderUser = senderUser;
        alarm.receiverUser = receiverUser;
        alarm.alarmType = alarmType;
        alarm.isRead = isRead;

        return alarm;
    }

}
