package com.zooflix.be_zooflix.domain.alarm.repository;

import com.zooflix.be_zooflix.domain.alarm.entity.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.management.Notification;
import java.util.List;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {

    List<Alarm> findByReceiverUserOrderByCreatedAtDesc(User rece)
}
