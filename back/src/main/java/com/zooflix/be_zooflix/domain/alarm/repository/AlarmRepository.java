package com.zooflix.be_zooflix.domain.alarm.repository;

import com.zooflix.be_zooflix.domain.alarm.entity.Alarm;
import com.zooflix.be_zooflix.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.management.Notification;
import java.util.List;

@Repository
public interface AlarmRepository extends JpaRepository<Alarm, Long> {
    List<Alarm> findByReceiverUserOrderByCreatedAtDesc(User receiverUser);
    List<Alarm> findByAlarmList();

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(nativeQuery = true, value = "delete from alarm a where a.user_no = :userNo or a.subscribe_no = :userNo")
    void deleteAllByUser(int userNo);
}
