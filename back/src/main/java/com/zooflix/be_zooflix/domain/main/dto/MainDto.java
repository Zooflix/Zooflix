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
    private double kospi;
    private double kosdaq;
    private double usd;
    private List<UserRankingKeyProjection> zustraRank;
    private List<StockRankingProjection> stockRank;
    private UserRankingKeyProjection topStreakUser;
    private UserRankingKeyProjection topFailUser;
    private UserRankingKeyProjection topStockUser;
}
