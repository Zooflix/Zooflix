package com.zooflix.be_zooflix.domain.stockSubscribe.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StockRankingDto {
    private int stockCode;
    private String stockName;
    private int subscriberCnt;
}
