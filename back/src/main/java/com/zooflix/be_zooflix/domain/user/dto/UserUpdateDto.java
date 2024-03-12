package com.zooflix.be_zooflix.domain.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateDto {
    private String userName;
    private String userPw;
    private String userAppKey;
    private String userSecretKey;
    private String userAccount;
}
