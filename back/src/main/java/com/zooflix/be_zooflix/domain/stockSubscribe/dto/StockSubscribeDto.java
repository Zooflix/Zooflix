package com.zooflix.be_zooflix.domain.stockSubscribe.dto;
import com.zooflix.be_zooflix.domain.user.entity.User;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class StockSubscribeDto {
    private int stockSubscribeNo;
    private int stockCode;
    private String stockName;
    private int stockCount;
    private LocalDateTime stockSubscribeCreate;
    private int stockSubscribeDay;
    private String userId;
    private String userAppKey;
    private String userSecretKey;
    private String userAccount;

}

