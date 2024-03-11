package com.zooflix.be_zooflix.domain.predict.dto;

import com.zooflix.be_zooflix.domain.predict.entity.Predict;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class PredictDto {
    private String stockName;
    private int userNo;
    private LocalDate createDate;
    private LocalDate pdDate;
    private int pdValue;
    private String pdContent;
    private int preValue;
    private boolean pdUpDown;

    public Predict toEntity() {
        return Predict.builder()
                .stockName(stockName)
                .userNo(userNo)
                .createDate(LocalDate.now())
                .pdDate(pdDate)
                .pdValue(pdValue)
                .pdContent(pdContent)
                .preValue(preValue)
                .pdUpDown(pdUpDown)
                .build();
    }
}
