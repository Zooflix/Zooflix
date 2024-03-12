package com.zooflix.be_zooflix.domain.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfoDto {
    private String userId;
    private String userName;
    private int predictCount;
    private int successCount;
    private double predictPercent;
    private double userTemperature;
    private int subscribeCount;
    private int subscriberCount;
}
