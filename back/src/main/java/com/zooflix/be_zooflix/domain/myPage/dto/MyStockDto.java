package com.zooflix.be_zooflix.domain.myPage.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyStockDto {
    private String stockName;   //주식 명
    private int stockCount;     //구매할 주식 수량
    private int stockDate;      //구매할 일자
    private Date stockSubscribeCreate;  //구독한 날짜
    private int stockTotalCount;        //총 매수 수량
}
