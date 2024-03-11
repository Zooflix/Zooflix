package com.zooflix.be_zooflix.domain.user.repository;

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
}
