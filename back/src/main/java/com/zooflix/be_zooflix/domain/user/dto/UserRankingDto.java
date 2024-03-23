package com.zooflix.be_zooflix.domain.user.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRankingDto {
    private int userNo;
    private String userId;
    private String userName;
    private int predictCount;
    private int successCount;
    private int failCount;
    private int userTemperature;
    private String userZbti;
    private int successStreak;

}
