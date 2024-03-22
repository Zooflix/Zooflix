package com.zooflix.be_zooflix.domain.user.repository;

import com.zooflix.be_zooflix.domain.myPage.dto.response.MyInfoDto;
import com.zooflix.be_zooflix.domain.myPage.dto.response.MySubscribeDto;
import com.zooflix.be_zooflix.domain.user.dto.UserInfoDto;
import com.zooflix.be_zooflix.domain.user.dto.UserKeyProjection;
import com.zooflix.be_zooflix.domain.user.dto.UserRankingDto;
import com.zooflix.be_zooflix.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    boolean existsByUserId(String userId);

    boolean existsByUserName(String userName);

    User findByUserId(String userId);

    //내 정보(user table)
    @Query(nativeQuery = true, value = "select * from user u where u.user_no = :userNo")
    User findMyInfo(@Param("userNo") int userNo);


    UserKeyProjection findByUserNo(int userNo);

    //구독한 사람의 닉네임과 온도
    @Query("select new com.zooflix.be_zooflix.domain.myPage.dto.response.MyInfoDto(u.userName, u.userTemperature) from User u where u.userNo = :subscribeUserNo")
    MyInfoDto findByUserId(@Param("subscribeUserNo") int subscribeUserNo);

    //구독한 사람 목록을 온도로 내림차순 정렬
    @Query("select new com.zooflix.be_zooflix.domain.myPage.dto.response.MyInfoDto(u.userName, u.userTemperature) from User u  order by u.userTemperature")
    List<MyInfoDto> findAllByTemperature();

    @Query(nativeQuery = true, value = "select user_no, user_name, predict_count, success_count, fail_count, user_temperature, user_zbti, success_streak from user u order by user_temperature desc limit 3")
    List<UserRankingDto> getUserRanking();
    @Query(nativeQuery = true, value = "select user_no, user_name, predict_count, success_count, fail_count, user_temperature, user_zbti, success_streak from user u order by success_count desc limit 1")
    UserRankingDto getMostPredictUser();
    @Query(nativeQuery = true, value = "select user_no, user_name, predict_count, success_count, fail_count, user_temperature, user_zbti, success_streak from user u order by fail_count desc limit 1")
    UserRankingDto getMostWrongPredictUser();

    @Query("SELECT new com.zooflix.be_zooflix.domain.user.dto.UserInfoDto(u.userNo, u.userId, u.userName, u.predictCount, u.successCount, u.userTemperature, " +
            "(SELECT COUNT(us1.subscribeNo) FROM user_subscribe us1 WHERE us1.user.userNo = u.userNo), " +
            "(SELECT COUNT(us2.user.userNo) FROM user_subscribe us2 WHERE us2.subscribeNo = u.userNo)) " +
            "FROM User u WHERE u.userNo = :userNo")
    UserInfoDto getUserSubscriptionInfoByUserNo(@Param("userNo") int userNo);

}
