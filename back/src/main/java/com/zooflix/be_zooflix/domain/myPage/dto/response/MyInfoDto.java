package com.zooflix.be_zooflix.domain.myPage.dto.response;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyInfoDto {
    private String userName;            //유저 닉네임
    private double userTemperature;     //유저 온도
    private int predictCount;           //총 예측 횟수
    private int successCount;           //예측 성공 횟수
    private double predictionRate;         //예측 비율
    private int SubscribeFromMe;        //내가 구독한 수
    private int subscribeToMe;          //나를 구독한 수

    public MyInfoDto(String userName, double userTemperature) {
        this.userName = userName;
        this.userTemperature = userTemperature;
    }
}
