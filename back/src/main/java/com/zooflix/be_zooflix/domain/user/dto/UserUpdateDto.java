package com.zooflix.be_zooflix.domain.user.dto;

import com.zooflix.be_zooflix.domain.user.entity.User;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserUpdateDto {
    private String userId;
    private String userName;
    private String userPw;
    private String userAppKey;
    private String userSecretKey;
    private String userAccount;

    public UserUpdateDto toDto(User user) {
        return UserUpdateDto.builder()
                .userId(user.getUserId())
                .userName(user.getUserName())
                .userPw(user.getUserPw())
                .userAppKey(user.getUserAppKey())
                .userSecretKey(user.getUserSecretKey())
                .userAccount(user.getUserAccount())
                .build();
    }

}
