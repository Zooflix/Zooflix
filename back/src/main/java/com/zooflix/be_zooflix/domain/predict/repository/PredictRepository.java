package com.zooflix.be_zooflix.domain.predict.repository;

import com.zooflix.be_zooflix.domain.predict.entity.Predict;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PredictRepository extends JpaRepository<Predict, Integer> {

    List<Predict> findeByStockName(String stockName);

    @Query(nativeQuery = true, value = "select * from prediction_board p where p.user_no = :userNo")
    List<Predict> findMyPredict(@Param("userNo") int userNo);
}
