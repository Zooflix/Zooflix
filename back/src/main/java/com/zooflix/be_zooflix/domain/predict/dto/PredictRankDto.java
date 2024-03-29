package com.zooflix.be_zooflix.domain.predict.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PredictRankDto {

    private int userNo;
    private String userName;
    private String userZbti;

}
