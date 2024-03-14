package com.zooflix.be_zooflix.domain.stockSubscribe.repository;

import com.zooflix.be_zooflix.domain.stockSubscribe.dto.StockSubscribeDto;
import com.zooflix.be_zooflix.domain.stockSubscribe.entity.StockSubscribe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockSubscribeRepository extends JpaRepository<StockSubscribe, Integer>, JpaSpecificationExecutor<StockSubscribe> {
    StockSubscribe findByStockSubscribeNo(int stockSubscribeNo);

    @Query(nativeQuery = true, value = "select * from stock_subscribe s where s.user_no = :userNo")
    List<StockSubscribe> findByUser(@Param("userNo") int userNo);

    //주식 구독 테이블에서 내일 날짜의 모든 주식 구독 내역 리스트
    @Query(nativeQuery = true, value = "select s.stock_code,s.stock_count, u.user_app_key, u.user_secret_key, u.user_account from stock_subscribe s join user u on s.user_no = u.user_no")
    List<StockSubscribeDto> findTomorrowSubscribe();

    @Query(nativeQuery = true, value = "select * from stock_subscribe s where s.user_no = :userNo")
    void addStockPurchase();

}

