package com.zooflix.be_zooflix.domain.predict.repository;

import com.zooflix.be_zooflix.domain.predict.entity.Predict;
import com.zooflix.be_zooflix.domain.predict.entity.StockList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StockListRepository extends JpaRepository<StockList, Integer> {

    @Query(nativeQuery = true, value = "SELECT stock_name FROM stock_list WHERE stock_name LIKE %:stockName%")
    List<String> findStockListByStockName(String stockName);

    @Query(nativeQuery = true, value = "SELECT stock_no FROM stock_list WHERE stock_name = :stockName")
    String findStockCode(String stockName);
}
