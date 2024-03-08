package com.zooflix.be_zooflix.domain.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSignupDto {
    private String userId;
    private String userPw;
    private String userName;
    private String userApiKey;
    private String userSecretKey;
    private String userAccount;
}
