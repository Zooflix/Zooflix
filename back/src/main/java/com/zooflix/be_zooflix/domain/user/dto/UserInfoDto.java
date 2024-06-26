package com.zooflix.be_zooflix.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoDto {
    private int userNo;
    private String userId;
    private String userName;
    private int predictCount;
    private int successCount;
    private double predictPercent;
    private double userTemperature;
    private long subscribeCount;
    private long subscriberCount;
    private String userZbti;

    public UserInfoDto(int userNo, String userId, String userName, int predictCount, int successCount, double userTemperature, long subscribeCount, long subscriberCount, String userZbti) {
        this.userNo = userNo;
        this.userId = userId;
        this.userName = userName;
        this.predictCount = predictCount;
        this.successCount = successCount;
        this.userTemperature = userTemperature;
        this.subscribeCount = subscribeCount;
        this.subscriberCount = subscriberCount;
        this.userZbti=userZbti;
    }

}
