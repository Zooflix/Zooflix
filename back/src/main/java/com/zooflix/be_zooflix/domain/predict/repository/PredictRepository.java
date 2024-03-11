package com.zooflix.be_zooflix.domain.predict.repository;

import com.zooflix.be_zooflix.domain.predict.entity.Predict;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface PredictRepository extends JpaRepository<Predict, Integer> {

    List<Predict> findByStockName(String stockName);
    List<Predict> findByPdDate(LocalDate pdDate);
}
