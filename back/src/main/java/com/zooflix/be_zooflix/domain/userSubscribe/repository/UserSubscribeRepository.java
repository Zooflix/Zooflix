package com.zooflix.be_zooflix.domain.userSubscribe.repository;

import com.zooflix.be_zooflix.domain.userSubscribe.entity.UserSubscribe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface UserSubscribeRepository extends JpaRepository<UserSubscribe, Integer> {

    //나를 구독한 사람들을 조회
    @Query(nativeQuery = true, value = "select * from user_subscribe s where s.subscribe_no = :subscribeNo")
    List<UserSubscribe> findSubscribeToMe(@Param("subscribeNo") int subscribeNo);

    //내가 구독한 사람들을 조회
    @Query(nativeQuery = true, value = "select s.subscribe_no, s.user_no, s.subscribe_user_no, s.subscribe_create from user_subscribe s where s.user_no = :userNo")
    List<UserSubscribe> findSubscribeFromMe(@Param("userNo") int userNo);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(nativeQuery = true, value = "delete from user_subscribe s where s.user_no = :userNo or s.subscribe_user_no = :userNo")
    void deleteAllByUser(int userNo);

}
