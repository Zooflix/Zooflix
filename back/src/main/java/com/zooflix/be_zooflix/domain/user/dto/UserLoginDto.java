package com.zooflix.be_zooflix.domain.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginDto {
    private String userId;
    private String userPw;
}
