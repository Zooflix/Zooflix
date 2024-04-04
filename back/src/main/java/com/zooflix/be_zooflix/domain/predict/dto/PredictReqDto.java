package com.zooflix.be_zooflix.domain.predict.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class PredictReqDto {
    private String stockName;
    private int userNo;
    private LocalDate pdDate;
    private int pdValue;
    private String pdContent;
    private int preValue;
    private boolean pdUpDown;

}
