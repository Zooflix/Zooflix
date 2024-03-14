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
}
