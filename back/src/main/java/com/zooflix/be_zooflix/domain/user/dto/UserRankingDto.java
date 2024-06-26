package com.zooflix.be_zooflix.domain.user.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRankingDto {
    private int userNo;
    private String userName;
    private int predictCount;
    private int successCount;
    private int failCount;
    private double userTemperature;
    private String userZbti;
    private int successStreak;
    private int cnt;
}
