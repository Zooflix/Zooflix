package com.zooflix.be_zooflix.domain.stockSubscribe.repository;

import com.zooflix.be_zooflix.domain.stockSubscribe.entity.StockSubscribe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockSubscribeRepository extends JpaRepository<StockSubscribe, Integer> , JpaSpecificationExecutor<StockSubscribe> {

    // 내가 정기 구독 중인 주식 리스트
    @Query(nativeQuery = true, value = "select * from stock_subscribe s where s.user_no = :userNo")
    List<StockSubscribe> findMyStockList(@Param("userNo") int userNo);
}
