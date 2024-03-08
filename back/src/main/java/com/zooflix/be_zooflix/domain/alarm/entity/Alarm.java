package com.zooflix.be_zooflix.domain.alarm.entity;

import com.zooflix.be_zooflix.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.DateTimeException;
import java.util.Date;

@Entity
@Getter
@Table(name = "alarm")
public class Alarm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alarm_no", nullable = false)
    private int alarmNo; //알람 id

    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_no")
    @Column(nullable = false)
    private User receiverUser; //사용자 -> receiver

    @Column(name = "subscribe_id")
    private User senderUser; //내가 구독한 사람의 id -> sender

    @Enumerated(EnumType.STRING)
    @Column(name = "alarm_type", nullable = false)
    private AlarmTypeStatus alarmType; //알림 종류

    @Column(name = "alarm_content")
    private String content; // 알림 내용

    @Column(name = "alarm_create")
    private Date createdAt; // 알림 발생 시점

    @Column(name = "is_read")
    private Boolean isRead; // 알림 확인 여부



}
