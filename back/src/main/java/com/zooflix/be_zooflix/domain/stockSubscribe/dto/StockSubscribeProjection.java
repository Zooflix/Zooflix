package com.zooflix.be_zooflix.domain.stockSubscribe.dto;

import java.time.LocalDateTime;

public interface StockSubscribeProjection {
    String getStockCode();
    String getStockName();
    int getStockCount();
    String getUserId();
    String getUserAppKey();
    String getUserSecretKey();
    String getUserAccount();
}
