package com.zooflix.be_zooflix.domain.myPage.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyPredictionDto {

    private int pdNo;               //주식 기본키
    private String stockName;       //주식 종목
    private int pdValue;            //예측 주식 가격
    private boolean pdUpDown;       //주식이 오를지 내릴지 예측 true(오른다), false(내린다)
    private LocalDate pdDate;       //예측 날짜
    private String pdResult;        //예측 결과
    private String pdContent;       //예측 근거
    private int userNo;             //유저 인덱스
}