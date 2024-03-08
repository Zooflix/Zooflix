package com.zooflix.be_zooflix.domain.predict.repository;

import com.zooflix.be_zooflix.domain.predict.entity.Predict;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PredictRepository extends JpaRepository<Predict, Integer> {

    List<Predict> findeByStockName(String stockName);
}
