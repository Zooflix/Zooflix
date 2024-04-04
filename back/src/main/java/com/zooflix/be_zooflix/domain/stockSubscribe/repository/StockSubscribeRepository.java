package com.zooflix.be_zooflix.domain.stockSubscribe.repository;

import com.zooflix.be_zooflix.domain.main.dto.StockRankingProjection;
import com.zooflix.be_zooflix.domain.main.dto.UserRankingKeyProjection;
import com.zooflix.be_zooflix.domain.stockSubscribe.dto.StockRankingDto;
import com.zooflix.be_zooflix.domain.stockSubscribe.dto.StockSubscribeDto;
import com.zooflix.be_zooflix.domain.stockSubscribe.dto.StockSubscribeProjection;
import com.zooflix.be_zooflix.domain.stockSubscribe.entity.StockSubscribe;
import com.zooflix.be_zooflix.domain.user.dto.UserRankingDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface StockSubscribeRepository extends JpaRepository<StockSubscribe, Integer>, JpaSpecificationExecutor<StockSubscribe> {
    StockSubscribe findByStockSubscribeNo(int stockSubscribeNo);

    @Query(nativeQuery = true, value = "select * from stock_subscribe s where s.user_no = :userNo")
    List<StockSubscribe> findByUser(@Param("userNo") int userNo);

    //주식 구독 테이블에서 내일 날짜의 모든 주식 구독 내역 리스트
    @Query(nativeQuery = true,
            value = "select s.stock_code as stockCode, s.stock_name as stockName, s.stock_count as stockCount, u.user_id as userId, u.user_app_key as userAppKey, u.user_secret_key as userSecretKey, u.user_account as userAccount " +
                    "from stock_subscribe s join user u " +
                    "on s.user_no = u.user_no " +
                    "where DAY(ADDDATE(NOW(),1))=s.stock_subscribe_day")
    List<StockSubscribeProjection> findTomorrowSubscribe();

    @Query(nativeQuery = true, value = "select * from stock_subscribe s where s.user_no = :userNo")
    void addStockPurchase();

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(nativeQuery = true, value = "delete from stock_subscribe s where s.user_no = :userNo")
    void deleteAllByUser(int userNo);

    @Query(nativeQuery = true,
            value = "SELECT stock_code as stockCode, stock_name as stockName, count(stock_subscribe_no) as subscriberCnt " +
                    "FROM stock_subscribe " +
                    "GROUP BY stock_code, stock_name " +
                    "ORDER BY subscriberCnt desc " +
                    "LIMIT 3")
    List<StockRankingProjection> getStockRanking();

//    @Query(nativeQuery = true, value = "SELECT " +
//                    "u.user_no AS userNo, " +
//                    "u.user_name AS userName, " +
//                    "u.predict_count AS predictCount, " +
//                    "u.success_count AS successCount, " +
//                    "u.fail_count AS failCount, " +
//                    "u.user_temperature AS userTemperature, " +
//                    "u.user_zbti AS userZbti, " +
//                    "u.success_streak AS successStreak, " +
//                    "count(*) AS cnt " +
//                    "FROM user u " +
//                    "JOIN (SELECT user_no, COUNT(*) c FROM predict GROUP BY stock_name ORDER BY c DESC LIMIT 1) p " +
//                    "ON u.user_no = p.user_no " +
//                    "GROUP BY u.user_no, u.user_name, u.predict_count, u.success_count, u.fail_count, u.user_temperature, u.user_zbti, u.success_streak " +
//                    "ORDER BY COUNT(*) DESC " +
//                    "LIMIT 1")
//    UserRankingKeyProjection getStockCodeMostPredictUSer();
    //제일 예측이 많은 주식
    // 주식 코드 가져와서 예측 테이블에서 해당 주식 가장 많이 성공한 user

    @Query(nativeQuery = true, value = "SELECT " +
            "u.user_no AS userNo, " +
            "u.user_name AS userName, " +
            "u.predict_count AS predictCount, " +
            "u.success_count AS successCount, " +
            "u.fail_count AS failCount, " +
            "u.user_temperature AS userTemperature, " +
            "u.user_zbti AS userZbti, " +
            "u.success_streak AS successStreak, " +
            "COUNT(p.user_no) AS cnt " +
            "FROM user u RIGHT JOIN (select * from predict where stock_name = '삼성전자' and pd_result = '성공') p " +
            "ON u.user_no = p.user_no " +
            "GROUP BY u.user_no " +
            "ORDER BY COUNT(p.user_no) DESC " +
            "LIMIT 1")
    UserRankingKeyProjection getStockCodeMostPredictUSer();


    @Query(nativeQuery = true, value = "SELECT * FROM stock_subscribe where stock_subscribe_day = :day")
    List<StockSubscribe> findSubscribersForDay(@Param("day") int day);
}

