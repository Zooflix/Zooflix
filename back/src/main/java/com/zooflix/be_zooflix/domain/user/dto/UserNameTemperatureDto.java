package com.zooflix.be_zooflix.domain.user.dto;

import lombok.*;

// 유저의 닉네임과 유저의 온도
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserNameTemperatureDto {
    private String userName;        //유저 닉네임
    private double userTemperature; //유저 온도
}
