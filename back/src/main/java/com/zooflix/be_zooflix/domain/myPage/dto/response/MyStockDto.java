package com.zooflix.be_zooflix.domain.myPage.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyStockDto {
    private String stockName;   //주식 명
    private int stockCount;     //구매할 주식 수량
    private int stockDate;      //구매할 일자
    private LocalDateTime stockSubscribeCreate;  //구독한 날짜
    private int stockTotalCount;//총 매수 수량
    private int userNo;         //유저 인덱스
}
