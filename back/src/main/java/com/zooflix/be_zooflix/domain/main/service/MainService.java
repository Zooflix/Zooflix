package com.zooflix.be_zooflix.domain.main.service;

import com.zooflix.be_zooflix.domain.main.dto.MainDto;
import com.zooflix.be_zooflix.domain.main.dto.UserRankingKeyProjection;
import com.zooflix.be_zooflix.domain.stockSubscribe.dto.StockRankingDto;
import com.zooflix.be_zooflix.domain.stockSubscribe.repository.StockSubscribeRepository;
import com.zooflix.be_zooflix.domain.user.dto.UserRankingDto;
import com.zooflix.be_zooflix.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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

    /**
     * 2.1 메인페이지 - 랭킹 데이터 조회
     *
     */

        public MainDto mainRankingData(){
//            List<Object[]> userRankingObjects = userRepository.getUserRanking();
//            List<UserRankingDto> userRankingList = userRankingObjects.stream()
//                    .map(obj -> new UserRankingDto(
//                            (int) obj[0],
//                            (String) obj[1],
//                            (int) obj[2],
//                            (int) obj[3],
//                            (int) obj[4],
//                            (double) obj[5],
//                            (String) obj[6],
//                            (int) obj[7]
//                    ))
//                    .collect(Collectors.toList());
            List<UserRankingKeyProjection> userRankingList = userRepository.getUserRanking();


//            Object[] mostPredictObject = userRepository.getMostPredictUser();
//            UserRankingDto mostPredictUser = new UserRankingDto(
//                    (int) mostPredictObject[0],
//                    (String) mostPredictObject[1],
//                    (int) mostPredictObject[2],
//                    (int) mostPredictObject[3],
//                    (int) mostPredictObject[4],
//                    (double) mostPredictObject[5],
//                    (String) mostPredictObject[6],
//                    (int) mostPredictObject[7]
//            );

            UserRankingKeyProjection mostPredictUser = userRepository.getMostPredictUser();

//            Object[] mostWrongObject = userRepository.getMostWrongPredictUser();
//            UserRankingDto mostWrongPredictUser = new UserRankingDto(
//                    (int) mostWrongObject[0],
//                    (String) mostWrongObject[1],
//                    (int) mostWrongObject[2],
//                    (int) mostWrongObject[3],
//                    (int) mostWrongObject[4],
//                    (double) mostWrongObject[5],
//                    (String) mostWrongObject[6],
//                    (int) mostWrongObject[7]
//            );

            UserRankingKeyProjection mostWrongPredictUser = userRepository.getMostWrongPredictUser();

//                    Object[] stockCodeMostPredictObject = stockSubscribeRepository.getStockCodeMostPredictUSer();
//            UserRankingDto stockCodeMostPredictUSer = new UserRankingDto(
//                    (int) stockCodeMostPredictObject[0],
//                    (String) stockCodeMostPredictObject[1],
//                    (int) stockCodeMostPredictObject[2],
//                    (int) stockCodeMostPredictObject[3],
//                    (int) stockCodeMostPredictObject[4],
//                    (double) stockCodeMostPredictObject[5],
//                    (String) stockCodeMostPredictObject[6],
//                    (int) stockCodeMostPredictObject[7]
//            );

            UserRankingKeyProjection stockCodeMostPredictUSer = stockSubscribeRepository.getStockCodeMostPredictUSer();

                    //List<StockRankingDto> stockRankingList = stockSubscribeRepository.getStockRanking();

//            List<Object[]> stockRankingListObjects = stockSubscribeRepository.getStockRanking();
//            List<StockRankingDto> stockRankingList = stockRankingListObjects.stream()
//                    .map(obj -> new StockRankingDto(
//                            (int) obj[0],
//                            (String) obj[1],
//                            (int) obj[2],
//                            (int) obj[3]
//                    ))
//                    .collect(Collectors.toList());

            List<StockRankingDto> stockRankingList = stockSubscribeRepository.getStockRanking();

            return new MainDto(userRankingList, stockRankingList, mostPredictUser, mostWrongPredictUser, stockCodeMostPredictUSer);
    }
}
