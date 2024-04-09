package com.zooflix.be_zooflix.domain.myPage.dto.response;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MyInfoDto {
    private int userNo;                 //유저 인덱스
    private String userId;              //유저 아이디
    private String userName;            //유저 닉네임
    private double userTemperature;     //유저 온도
    private int predictCount;           //총 예측 횟수
    private int successCount;           //예측 성공 횟수
    private double predictionRate;      //예측 비율
    private int SubscribeFromMe;        //내가 구독한 수
    private int subscribeToMe;          //나를 구독한 수
    private String userZbti;

    public MyInfoDto(String userName, double userTemperature, String userZbti) {
        this.userName = userName;
        this.userTemperature = userTemperature;
        this.userZbti = userZbti;
    }

    public MyInfoDto(int userNo, String userName, double userTemperature) {
        this.userNo = userNo;
        this.userName = userName;
        this.userTemperature = userTemperature;
    }
}
