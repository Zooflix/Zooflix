package com.zooflix.be_zooflix.domain.stockSubscribe.repository;

import com.zooflix.be_zooflix.domain.stockSubscribe.entity.StockSubscribe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface StockSubscribeRepository extends JpaRepository<StockSubscribe, Integer> , JpaSpecificationExecutor<StockSubscribe> {

    StockSubscribe findByStockSubscribeNo(int stockSubscribeNo);
}
