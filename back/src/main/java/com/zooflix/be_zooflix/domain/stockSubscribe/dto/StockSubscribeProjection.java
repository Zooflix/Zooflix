package com.zooflix.be_zooflix.domain.stockSubscribe.dto;

import java.time.LocalDateTime;

public interface StockSubscribeProjection {
    int getStockSubscribeNo();
    String getStockCode();
    String getStockName();
    int getStockCount();
    LocalDateTime getStockSubscribeCreate();
    int getStockSubscribeDay();
    String getUserId();
    String getUserAppKey();
    String getUserSecretKey();
    String getUserAccount();
}
