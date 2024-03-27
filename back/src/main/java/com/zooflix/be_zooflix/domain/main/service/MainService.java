package com.zooflix.be_zooflix.domain.main.service;

import com.zooflix.be_zooflix.domain.main.dto.MainDto;
import com.zooflix.be_zooflix.domain.main.dto.StockRankingProjection;
import com.zooflix.be_zooflix.domain.main.dto.UserRankingKeyProjection;
import com.zooflix.be_zooflix.domain.stockSubscribe.dto.StockRankingDto;
import com.zooflix.be_zooflix.domain.stockSubscribe.repository.StockSubscribeRepository;
import com.zooflix.be_zooflix.domain.user.dto.UserRankingDto;
import com.zooflix.be_zooflix.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MainService {
            private final UserRepository userRepository;
            private final StockSubscribeRepository stockSubscribeRepository;

            @Value("http://127.0.0.1:8000/get_indices")
            private String indices;


            /**
             * 2.1 메인페이지 - 랭킹 데이터 조회
             *
             */

            public MainDto mainRankingData(){
            List<UserRankingKeyProjection> userRankingList = userRepository.getUserRanking();
            UserRankingKeyProjection mostPredictUser = userRepository.getMostPredictUser();
            UserRankingKeyProjection mostWrongPredictUser = userRepository.getMostWrongPredictUser();
            UserRankingKeyProjection stockCodeMostPredictUSer = stockSubscribeRepository.getStockCodeMostPredictUSer();
            List<StockRankingProjection> stockRankingList = stockSubscribeRepository.getStockRanking();

            return new MainDto(userRankingList, stockRankingList, mostPredictUser, mostWrongPredictUser, stockCodeMostPredictUSer);
    }
}
