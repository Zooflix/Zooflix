package com.zooflix.be_zooflix.domain.predict.dto;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StockHistoryDto {
    private String stockDate; //주문일
    private String stockType; //매도매수
    private String stockName; //종목이름
    private String stockNum; //수량
    private String stockCost; //체결평균가
}
