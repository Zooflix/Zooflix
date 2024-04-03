package com.zooflix.be_zooflix.domain.main.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MainIndiceDto {
    private double kospi;
    private double kosdaq;
    private double usd;
}
