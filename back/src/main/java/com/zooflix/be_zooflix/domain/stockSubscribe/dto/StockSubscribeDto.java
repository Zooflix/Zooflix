package com.zooflix.be_zooflix.domain.stockSubscribe.dto;
import lombok.*;
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class StockSubscribeDto {
    private String stockName;
    private int stockCount;
    private String subscribeDate;
    private int userNo;
    private String userAppKey;
    private String userSecretKey;
    private String userAccount;
}
