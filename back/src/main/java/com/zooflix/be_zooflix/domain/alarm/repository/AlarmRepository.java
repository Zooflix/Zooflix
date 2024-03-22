package com.zooflix.be_zooflix.domain.alarm.repository;

import com.zooflix.be_zooflix.domain.alarm.dto.response.FindListAlarmKeyProjectionResponse;
import com.zooflix.be_zooflix.domain.alarm.dto.response.FindListAlarmResponse;
import com.zooflix.be_zooflix.domain.alarm.entity.Alarm;
import com.zooflix.be_zooflix.domain.user.entity.User;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.management.Notification;
import java.util.List;

@Repository
public interface AlarmRepository extends JpaRepository<Alarm, Long> {
    @Query(value = "SELECT a.subscribe_no AS senederId, u.user_name AS nickname, a.created_at AS createdAt, a.alarm_type AS type, a.is_read AS isRead " +
            "FROM alarm a " +
            "LEFT JOIN user u ON a.subscribe_no = u.user_no " +
            "WHERE a.user_no = (SELECT user_no FROM user WHERE user_id = :userId)", nativeQuery = true)
    List<FindListAlarmKeyProjectionResponse> findAlarmsByUserIdWithSubscribeName(String userId);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(nativeQuery = true, value = "delete from alarm a where a.user_no = :userNo or a.subscribe_no = :userNo")
    void deleteAllByUser(int userNo);
}
