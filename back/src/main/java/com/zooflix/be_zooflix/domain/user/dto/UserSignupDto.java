package com.zooflix.be_zooflix.domain.user.dto;

import com.zooflix.be_zooflix.domain.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class UserSignupDto {
    private String userId;
    private String userPw;
    private String userName;
    private String userAppKey;
    private String userSecretKey;
    private String userAccount;
    private String userRole;

    public User toEntity() {
        return User.builder()
                .userId(userId)
                .userPw(userPw)
                .userName(userName)
                .userCreate(LocalDateTime.now())
                .userAppKey(userAppKey)
                .userSecretKey(userSecretKey)
                .userAccount(userAccount)
                .userZbti("Bear")
                .userTemperature(30.0)
                .userRole("ROLE_USER")
                .build();
    }
}
