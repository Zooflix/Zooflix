package com.zooflix.be_zooflix.domain.user.dto;

import com.zooflix.be_zooflix.domain.user.entity.User;
import jakarta.persistence.Column;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private int userNo;
    private String userId;
    private String userPw;
    private String userName;
    private int reportCount;
    private LocalDateTime reportDate;
    private int predictCount;
    private int successCount;
    private int failCount;
    private double userTemperature;
    private String userZbti;
    private int successStreak;
    private LocalDateTime userCreate;
    private String userAppKey;
    private String userSecretKey;
    private String userAccount;
    private String userRole;
    private String userToken;
    private LocalDateTime userTokenDate;

    public UserDto toDTO(User user) {
        return UserDto.builder()
                .userNo(user.getUserNo())
                .userId(user.getUserId())
                .userPw(user.getUserPw())
                .userName(user.getUserName())
                .reportCount(user.getReportCount())
                .reportDate(user.getReportDate())
                .predictCount(user.getPredictCount())
                .successCount(user.getSuccessCount())
                .failCount(user.getFailCount())
                .userTemperature(user.getUserTemperature())
                .userZbti(user.getUserZbti())
                .successStreak(user.getSuccessStreak())
                .userCreate(user.getUserCreate())
                .userAppKey(user.getUserAppKey())
                .userSecretKey(user.getUserSecretKey())
                .userAccount(user.getUserAccount())
                .userRole(user.getUserRole())
                .userToken(user.getUserToken())
                .userTokenDate(user.getUserTokenDate())
                .build();
    }
}
