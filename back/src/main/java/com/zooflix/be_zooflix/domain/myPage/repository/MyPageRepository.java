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

}
