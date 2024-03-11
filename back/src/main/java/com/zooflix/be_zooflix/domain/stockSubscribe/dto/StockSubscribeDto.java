package com.zooflix.be_zooflix.domain.stockSubscribe.dto;
import lombok.*;
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class StockSubscribeDto {
    private int stockCode;
    private String stockName;
    private int stockCount;
    private int stockSubscribeDate;
    private int userNo;
    private String userAppKey;
    private String userSecretKey;
    private String userAccount;
}

