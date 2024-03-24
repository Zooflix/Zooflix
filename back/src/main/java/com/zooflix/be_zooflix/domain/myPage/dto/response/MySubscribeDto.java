package com.zooflix.be_zooflix.domain.myPage.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MySubscribeDto {
    private int subscribeNo;            //구독 인덱스
    private String subscribeName;       //구독한 사람의 닉네임
    private double subscribeTemperature;   //구독한 사람의 온도
}
