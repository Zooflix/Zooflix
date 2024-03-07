package com.zooflix.be_zooflix.domain.alarm.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class Alarm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alarm_no")
    private int alarmNo;

    @Column(name = "user_no")
    private int userNo;

    @Column(name = "subscribe_id")
    private int subscribeId;

    @Column(name = "alarm_type")
    private int alarmType;
    
    @Column(name = "alarm_content")
    private String content;

    @Column(name = "alarm_create")
    private Date createdAt;

    @Column(name = "is_read")
    private boolean isRead;
}
