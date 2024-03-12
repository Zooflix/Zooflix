package com.zooflix.be_zooflix.domain.predict.dto;

import com.zooflix.be_zooflix.domain.predict.entity.Predict;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PredictResDto {
    private int pdNo;
    private String stockName;
    private int userNo;
    private String userName;
    private double userTem;
    private LocalDateTime createDate;
    private LocalDate pdDate;
    private int pdValue;
    private String pdContent;
    private String pdResult;
    private int preValue;
    private int nxtValue;
    private boolean pdUpDown;

}
