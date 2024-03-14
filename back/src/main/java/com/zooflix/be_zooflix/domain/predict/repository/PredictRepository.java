package com.zooflix.be_zooflix.domain.predict.repository;

import com.zooflix.be_zooflix.domain.predict.entity.Predict;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

public interface PredictRepository extends JpaRepository<Predict, Integer> {

    List<Predict> findByStockNameOrderByCreateDateDesc(String stockName);
    List<Predict> findByPdDate(LocalDate pdDate);

    @Query(nativeQuery = true, value = "select * from predict p where p.user_no = :userNo")
    List<Predict> findMyPredictList(@Param("userNo") int userNo);
    @Query(nativeQuery = true
            , value = "SELECT p.* FROM predict p INNER JOIN user u ON p.user_no = u.user_no ORDER BY CASE WHEN p.pd_result IS NULL THEN 0 ELSE 1 END, p.pd_date ASC, u.user_temperature DESC;")
    List<Predict> findByAllOrderByUserTem();

    @Query(nativeQuery = true
            , value = "SELECT p.* FROM predict p INNER JOIN user u ON p.user_no = u.user_no WHERE p.stock_name = :stockName ORDER BY CASE WHEN p.pd_result IS NULL THEN 0 ELSE 1 END, p.pd_date ASC, u.user_temperature DESC;")
    List<Predict> findByStockNameOrderByUserTem(String stockName);

    @Query(nativeQuery = true, value = "SELECT pd_date from predict where user_no= :userNo AND pd_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY) and pd_date <= CURRENT_DATE();")
    List<String> findPdDateByUserNo(int userNo);

    @Query(nativeQuery = true, value = "SELECT pd_value from predict where user_no= :userNo AND pd_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY) and pd_date <= CURRENT_DATE();")
    List<String> findPdValueByUserNo(int userNo);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(nativeQuery = true, value = "delete from predict p where p.user_no = :userNo")
    void deleteAllByUser(int userNo);


}
