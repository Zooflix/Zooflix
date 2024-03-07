package com.zooflix.be_zooflix.domain.myPage.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyPageDto {
    private String userName;            //유저 닉네임
    private double userTemperature;     //유저 온도
    private int predictCount;           //총 예측 횟수
    private int successCount;           //예측 성공 횟수
    private int predictionRate;         //예측 비율
    private int mySubscribe;
}
