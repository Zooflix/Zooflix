package com.zooflix.be_zooflix.domain.main.dto;

import com.zooflix.be_zooflix.domain.stockSubscribe.dto.StockRankingDto;
import com.zooflix.be_zooflix.domain.user.dto.UserRankingDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MainDto {
    private List<UserRankingDto> userRankList;
    private List<StockRankingDto> stockRankingList;
    private UserRankingDto mostPredictUser;
    private UserRankingDto mostWrongPredictUser;
}
