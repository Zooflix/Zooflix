package com.zooflix.be_zooflix.domain.main.dto;

public interface StockRankingProjection {
    int getStockCode();
    String getStockName();
    int getSubscriberCnt();
}
