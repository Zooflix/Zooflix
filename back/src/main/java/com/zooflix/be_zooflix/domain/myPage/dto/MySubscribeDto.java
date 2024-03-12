package com.zooflix.be_zooflix.domain.myPage.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MySubscribeDto {
    private String subscribeName;       //구독한 사람의 닉네임
    private double subscribeTemperature;   //구독한 사람의 온도

}
