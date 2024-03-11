package com.zooflix.be_zooflix.domain.user.dto;

import com.zooflix.be_zooflix.domain.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserSignupDto {
    private String userId;
    private String userPw;
    private String userName;
    private String userApiKey;
    private String userSecretKey;
    private String userAccount;

    public User toEntity() {
        return User.builder()
                .userId(userId)
                .userPw(userPw)
                .userName(userName)
                .userAppKey(userApiKey)
                .userSecretKey(userSecretKey)
                .userAccount(userAccount)
                .build();
    }
}
