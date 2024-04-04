package com.zooflix.be_zooflix.domain.stockSubscribe.dto;

public interface StockSubscribeProjection {
    String getStockCode();
    String getStockName();
    int getStockCount();
    String getUserId();
    String getUserAppKey();
    String getUserSecretKey();
    String getUserAccount();
}
