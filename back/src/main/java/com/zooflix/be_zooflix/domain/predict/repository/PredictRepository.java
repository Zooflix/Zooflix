package com.zooflix.be_zooflix.domain.predict.repository;

import com.zooflix.be_zooflix.domain.predict.entity.Predict;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface PredictRepository extends JpaRepository<Predict, Integer> {

    List<Predict> findByStockName(String stockName);
    List<Predict> findByPdDate(LocalDate pdDate);

    @Query(nativeQuery = true
            , value = "SELECT p.* FROM predict p INNER JOIN user u ON p.user_no = u.user_no ORDER BY DATE(p.create_date) ASC, CASE WHEN p.pd_result IS NULL THEN 0 ELSE 1 END, u.user_temperature DESC;")
    List<Predict> findByAllOrderByUserTem();

    @Query(nativeQuery = true
            , value = "SELECT p.* FROM predict p INNER JOIN user u ON p.user_no = u.user_no WHERE p.stock_name = :stockName ORDER BY DATE(p.create_date) ASC, CASE WHEN p.pd_result IS NULL THEN 0 ELSE 1 END, u.user_temperature DESC;")
    List<Predict> findByStockNameOrderByUserTem(String stockName);

    @Query(nativeQuery = true, value = "select * from predict p where p.user_no = :userNo")
    List<Predict> findMyPredict(@Param("userNo") int userNo);
}
