package com.zooflix.be_zooflix.domain.user.repository;

import com.zooflix.be_zooflix.domain.myPage.dto.response.MySubscribeDto;
import com.zooflix.be_zooflix.domain.user.dto.UserInfoDto;
import com.zooflix.be_zooflix.domain.user.dto.UserKeyProjection;
import com.zooflix.be_zooflix.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    boolean existsByUserId(String userId);

    boolean existsByUserName(String userName);

    User findByUserId(String userId);

    //내 정보(user table)
    @Query(nativeQuery = true, value = "select * from user u where u.user_no = :userNo")
    User findMyInfo(@Param("userNo") int userNo);


    UserKeyProjection findByUserNo(int userNo);

    //닉네임으로 user 찾기
    MySubscribeDto findByUserName(String userName);

    @Query("SELECT new com.zooflix.be_zooflix.domain.user.dto.UserInfoDto(u.userId, u.userName, u.predictCount, u.successCount, u.userTemperature, " +
            "(SELECT COUNT(us1.subscribeNo) FROM user_subscribe us1 WHERE us1.user.userNo = u.userNo), " +
            "(SELECT COUNT(us2.user.userNo) FROM user_subscribe us2 WHERE us2.subscribeName = u.userName)) " +
            "FROM User u WHERE u.userId = :userId")
    UserInfoDto getUserSubscriptionInfoByUserNo(@Param("userId") String userId);

}
