package com.zooflix.be_zooflix.domain.userSubscribe.repository;

import com.zooflix.be_zooflix.domain.userSubscribe.dto.UserSubscribeReqDto;
import com.zooflix.be_zooflix.domain.userSubscribe.entity.UserSubscribe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Repository
public interface UserSubscribeRepository extends JpaRepository<UserSubscribe, Integer> {

    //나를 구독한 사람들을 조회
    @Query(nativeQuery = true, value = "select * from user_subscribe s where s.subscribe_user_no = :subscribeUserNo")
    List<UserSubscribe> findSubscribeToMe(@Param("subscribeUserNo") int subscribeUserNo);

    //내가 구독한 사람들을 조회(유저 온도 DESC)
    @Query(nativeQuery = true,
            value = "select s.*\n" +
                    "from user_subscribe s\n" +
                    "inner join user u ON u.user_no = s.subscribe_user_no\n" +
                    "where s.user_no = :userNo\n" +
                    "ORDER BY u.user_temperature desc;")
    List<UserSubscribe> findSubscribeFromMe(@Param("userNo") int userNo);

//    // 내가 구독한 사람 중복 조회
//    @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM user_subscribe WHERE user_no = :userNo AND subscribe_user_no = :subscribeUserNo")
//    int countSubscriptionDuplication(@Param("userNo") int userNo, @Param("subscribeUserNo") int subscribeUserNo);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(nativeQuery = true, value = "delete from user_subscribe s where s.user_no = :userNo or s.subscribe_user_no = :userNo")
    void deleteAllByUser(int userNo);

}
