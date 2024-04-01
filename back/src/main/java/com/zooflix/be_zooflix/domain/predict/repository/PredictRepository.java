package com.zooflix.be_zooflix.domain.predict.repository;

import com.zooflix.be_zooflix.domain.predict.dto.PredictRankDto;
import com.zooflix.be_zooflix.domain.predict.entity.Predict;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

public interface PredictRepository extends JpaRepository<Predict, Integer> {

    Predict findByPdNo(int PdNo);

    List<Predict> findByStockNameOrderByCreateDateDesc(String stockName);
    @Query(nativeQuery = true, value = "select * from predict p where pd_date <= :pdDate AND pd_result IS NULL")
    List<Predict> findByPdDate(LocalDate pdDate);

    @Query(nativeQuery = true, value = "select * from predict p where p.user_no = :userNo order by pd_date DESC")
    List<Predict> findMyPredictList(@Param("userNo") int userNo);
    @Query(nativeQuery = true
            , value = "SELECT p.*\n" +
            "FROM predict p\n" +
            "INNER JOIN user u ON p.user_no = u.user_no\n" +
            "ORDER BY\n" +
            "  CASE WHEN p.pd_result IS NULL THEN 0 ELSE 1 END,\n" +
            "  CASE WHEN p.pd_result IS NULL THEN p.pd_date END ASC,\n" +
            "  CASE WHEN p.pd_result IS NOT NULL THEN p.pd_date END DESC,\n" +
            "  u.user_temperature DESC;")
    List<Predict> findByAllOrderByUserTem();

    @Query(nativeQuery = true
            , value = "SELECT p.*\n" +
            "FROM predict p\n" +
            "INNER JOIN user u ON p.user_no = u.user_no\n" +
            "WHERE p.stock_name = :stockName\n" +
            "ORDER BY\n" +
            "  CASE WHEN p.pd_result IS NULL THEN 0 ELSE 1 END,\n" +
            "  CASE WHEN p.pd_result IS NULL THEN p.pd_date END ASC,\n" +
            "  CASE WHEN p.pd_result IS NOT NULL THEN p.pd_date END DESC,\n" +
            "  u.user_temperature DESC;")
    List<Predict> findByStockNameOrderByUserTem(String stockName);

    @Query(nativeQuery = true, value = "SELECT pd_date from predict where user_no= :userNo AND stock_name = :stockName AND pd_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY) and pd_date <= CURRENT_DATE();")
    List<String> findPdDateByUserNo(int userNo, String stockName);

    @Query(nativeQuery = true, value = "SELECT pd_value from predict where user_no= :userNo AND stock_name = :stockName AND pd_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY) and pd_date <= CURRENT_DATE();")
    List<String> findPdValueByUserNo(int userNo, String stockName);

    @Query(nativeQuery = true, value = "SELECT pd_result from predict where user_no= :userNo AND stock_name = :stockName AND pd_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY) and pd_date <= CURRENT_DATE();")
    List<String> findPdResultByUserNo(int userNo, String stockName);

    @Query(nativeQuery = true, value = "SELECT CASE  WHEN COUNT(*) >= 1 THEN 'true'  ELSE 'false' END AS result from predict where user_no= :userNo AND stock_name = :stockName AND pd_result IS NULL")
    boolean findStockNameNoResult(int userNo, String stockName); //있으면true 없으면false

    @Query(nativeQuery = true, value = "select * from predict p where pd_result IS NOT NULL order by pd_date DESC")
    List<Predict> findEndPredict();

    @Query(nativeQuery = true, value = "select * from predict p WHERE p.stock_name = :stockName AND pd_result IS NOT NULL order by pd_date DESC")
    List<Predict> findEndPredictByStockName(String stockName);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(nativeQuery = true, value = "delete from predict p where p.user_no = :userNo")
    void deleteAllByUser(int userNo);

    @Query(nativeQuery = true, value = "SELECT user_no FROM user ORDER BY user_temperature DESC LIMIT 1")
    int findZoostra();


    @Query(nativeQuery = true, value = "SELECT user_no\n" +
            "FROM predict\n" +
            "WHERE stock_name = :stockName AND pd_result = '성공'\n" +
            "GROUP BY user_no\n" +
            "ORDER BY COUNT(CASE WHEN pd_result = '실패' THEN 1 END) ASC, COUNT(*) DESC\n" +
            "LIMIT 1;")
    String findZoostraByStockName(String stockName);

    @Query(nativeQuery = true, value = "SELECT user_name FROM user where user_no = :userNo")
    String findUserNameByUserNo(int userNo);

    @Query(nativeQuery = true, value = "SELECT user_zbti FROM user where user_no = :userNo")
    String findUserZbtiByUserNo(int userNo);
}
