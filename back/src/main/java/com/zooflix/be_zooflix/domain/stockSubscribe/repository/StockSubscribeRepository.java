package com.zooflix.be_zooflix.domain.stockSubscribe.repository;

import com.zooflix.be_zooflix.domain.stockSubscribe.dto.StockRankingDto;
import com.zooflix.be_zooflix.domain.stockSubscribe.dto.StockSubscribeDto;
import com.zooflix.be_zooflix.domain.stockSubscribe.entity.StockSubscribe;
import com.zooflix.be_zooflix.domain.user.dto.UserRankingDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface StockSubscribeRepository extends JpaRepository<StockSubscribe, Integer>, JpaSpecificationExecutor<StockSubscribe> {
    StockSubscribe findByStockSubscribeNo(int stockSubscribeNo);

    @Query(nativeQuery = true, value = "select * from stock_subscribe s where s.user_no = :userNo")
    List<StockSubscribe> findByUser(@Param("userNo") int userNo);

    //주식 구독 테이블에서 내일 날짜의 모든 주식 구독 내역 리스트
    @Query(nativeQuery = true,
            value = "select s.stock_code,s.stock_count, u.user_app_key, u.user_secret_key, u.user_account " +
                    "from stock_subscribe s join user u " +
                    "on s.user_no = u.user_no " +
                    "where DAY(NOW())=s.stock_subscribe_day")
    List<StockSubscribeDto> findTomorrowSubscribe();

    @Query(nativeQuery = true, value = "select * from stock_subscribe s where s.user_no = :userNo")
    void addStockPurchase();

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(nativeQuery = true, value = "delete from stock_subscribe s where s.user_no = :userNo")
    void deleteAllByUser(int userNo);

    @Query(nativeQuery = true,
            value = "select stock_code, stock_name, count(stock_no) as subscriber_no, RANK() OVER ( order by subscriber_no ) as ranking " +
                    "from stock_subscribe group by stock_code desc limit 3")
    List<StockRankingDto> getStockRanking();

    @Query(nativeQuery = true,
            value = "select stock_code, stock_name, count(stock_no) as subscriber_no, RANK() OVER ( order by subscriber_no ) as ranking " +
                    "from stock_subscribe group by stock_code desc limit 1")
    UserRankingDto getStockCodeMostPredictUSer();

}

