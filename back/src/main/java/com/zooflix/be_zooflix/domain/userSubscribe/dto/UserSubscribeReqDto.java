package com.zooflix.be_zooflix.domain.userSubscribe.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserSubscribeReqDto {
    private int userNo;
    private int subscribeUserNo;
}
