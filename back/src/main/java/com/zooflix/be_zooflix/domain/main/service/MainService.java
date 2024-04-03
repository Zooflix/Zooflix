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
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MainService {
    private final UserRepository userRepository;
    private final StockSubscribeRepository stockSubscribeRepository;

    @Value("${python.endpoint.indices}")
    private String indicesEndpoint;

    public double[] callIndicesEndpoint() {
        RestTemplate restTemplate = new RestTemplate();
        // REST API 호출
        Double[] result = restTemplate.getForObject(indicesEndpoint, Double[].class);
        System.out.println("call");
        System.out.println(result[0]);
        System.out.println(result.length);

        // double[]로 변환
        double[] convertedResult = new double[result.length];
        for (int i = 0; i < result.length; i++) {
            convertedResult[i] = result[i];
        }

        return convertedResult;
    }
    /**
     * 2.1 메인페이지 - 랭킹 데이터 조회
     */

    public MainDto mainRankingData() {
        long start = System.currentTimeMillis();
        List<UserRankingKeyProjection> userRankingList = userRepository.getUserRanking();
        UserRankingKeyProjection mostPredictUser = userRepository.getMostPredictUser();
        UserRankingKeyProjection mostWrongPredictUser = userRepository.getMostWrongPredictUser();
        UserRankingKeyProjection stockCodeMostPredictUSer = stockSubscribeRepository.getStockCodeMostPredictUSer();
        List<StockRankingProjection> stockRankingList = stockSubscribeRepository.getStockRanking();
        double[] indices = callIndicesEndpoint();
        MainDto dto = new MainDto(indices[0], indices[1], indices[2], userRankingList, stockRankingList, mostPredictUser, mostWrongPredictUser, stockCodeMostPredictUSer);

        return dto;
    }
}
