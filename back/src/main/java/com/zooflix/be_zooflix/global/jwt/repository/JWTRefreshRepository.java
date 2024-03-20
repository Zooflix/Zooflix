package com.zooflix.be_zooflix.global.jwt.repository;

import com.zooflix.be_zooflix.global.jwt.entity.JWTRefresh;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface JWTRefreshRepository extends JpaRepository<JWTRefresh, Long> {
    Boolean existsByRefreshToken(String refreshToken);

    @Transactional
    void deleteByRefreshToken(String refreshToken);
}
