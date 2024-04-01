package com.zooflix.be_zooflix.domain.userSubscribe.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserSubscribeReqDto {
    private int userNo;
    private int subscribeUserNo;
}
