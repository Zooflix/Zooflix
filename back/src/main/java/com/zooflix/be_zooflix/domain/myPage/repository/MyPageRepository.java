package com.zooflix.be_zooflix.domain.myPage.repository;

import com.zooflix.be_zooflix.domain.predict.entity.Predict;
import com.zooflix.be_zooflix.domain.stockSubscribe.entity.StockSubscribe;
import com.zooflix.be_zooflix.domain.user.entity.User;
import com.zooflix.be_zooflix.domain.userSubscribe.entity.UserSubscribe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MyPageRepository extends JpaRepository<User, Integer> {    // JpaRepository 에 어떻게 넣어야 할까??
    //내 정보(user table)
    @Query(nativeQuery = true, value = "select * from user u where u.user_no = :userNo")
    User findMyInfo(@Param("userNo") int userNo);

    //내가 쓴 예측 글(predict table)
    @Query(nativeQuery = true, value = "select * from prediction_board p where p.user_no = :userNo")
    List<Predict> findAllPrediction(@Param("userNo") int userNo);

    //정기 구독 주식
    @Query(nativeQuery = true, value = "select * from stock_subscribe s where s.user_no = :userNo")
    List<StockSubscribe> findALlSubscribedStock(@Param("userNo") int userNo);

    //구독 중인 회원
    @Query(nativeQuery = true, value = "select * from subscribe s where s.user_no = :userNo")
    List<UserSubscribe> findAllSubscribedUser(@Param("userNo") int userNo);

}
