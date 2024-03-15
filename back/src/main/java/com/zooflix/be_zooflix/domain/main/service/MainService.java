package com.zooflix.be_zooflix.domain.main.service;

import com.zooflix.be_zooflix.domain.main.dto.MainDto;
import com.zooflix.be_zooflix.domain.stockSubscribe.dto.StockRankingDto;
import com.zooflix.be_zooflix.domain.stockSubscribe.repository.StockSubscribeRepository;
import com.zooflix.be_zooflix.domain.user.dto.UserRankingDto;
import com.zooflix.be_zooflix.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MainService {
        private final UserRepository userRepository;
        private final StockSubscribeRepository stockSubscribeRepository;

    /**
     * 2.1 메인페이지 - 랭킹 데이터 조회
     *
     */

    public MainDto mainRankingData(){
        List<UserRankingDto> userRankingList = userRepository.getUserRanking();
        List<StockRankingDto> stockRankingList = stockSubscribeRepository.getStockRanking();

        UserRankingDto mostPredictUser = userRepository.getMostPredictUser();
        UserRankingDto mostWrongPredictUser = userRepository.getMostWrongPredictUser();

        MainDto maindto = new MainDto(userRankingList, stockRankingList, mostPredictUser, mostWrongPredictUser);
        return maindto;
    }
}
