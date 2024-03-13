package com.zooflix.be_zooflix.domain.alarm.repository;

import com.zooflix.be_zooflix.domain.alarm.entity.Alarm;
import com.zooflix.be_zooflix.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.management.Notification;
import java.util.List;

@Repository
public interface AlarmRepository extends JpaRepository<Alarm, Long> {
    List<Alarm> findByReceiverUserOrderByCreatedAtDesc(User receiverUser);

    @Query(nativeQuery = true, value = "delete from alarm a where a.user_no = :userNo and a.subscribe_id = ifnull((select user_id as subscribe_id from user u where u.user_no = :userNo LIMIT 1), 0)")
    void deleteAllByUser(int userNo);
}
