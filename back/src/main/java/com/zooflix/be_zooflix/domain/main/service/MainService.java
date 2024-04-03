package com.zooflix.be_zooflix.domain.main.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zooflix.be_zooflix.domain.main.dto.MainDto;
import com.zooflix.be_zooflix.domain.main.dto.MainIndiceDto;
import com.zooflix.be_zooflix.domain.main.dto.StockRankingProjection;
import com.zooflix.be_zooflix.domain.main.dto.UserRankingKeyProjection;
import com.zooflix.be_zooflix.domain.stockSubscribe.dto.StockRankingDto;
import com.zooflix.be_zooflix.domain.stockSubscribe.repository.StockSubscribeRepository;
import com.zooflix.be_zooflix.domain.user.dto.UserRankingDto;
import com.zooflix.be_zooflix.domain.user.repository.UserRepository;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
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

    @Autowired
    private RedisTemplate<String, String> redisTemplate; // Value는 문자열로 직렬화

    private ObjectMapper objectMapper = new ObjectMapper();

    public static final String REDIS_INDICES = "indices";

    @Scheduled(cron = "0 */5 * * * *")
    public void saveData() throws JsonProcessingException {
        String jsonValue = objectMapper.writeValueAsString(callIndicesEndpoint());
        redisTemplate.opsForValue().set(REDIS_INDICES, jsonValue);
    }

    public double[] getData() throws JsonProcessingException {
        String jsonValue = redisTemplate.opsForValue().get(REDIS_INDICES);
        if (jsonValue == null) return null;
        return objectMapper.readValue(jsonValue, double[].class);
    }

    public double[] callIndicesEndpoint() {
        RestTemplate restTemplate = new RestTemplate();
        // REST API 호출
        Double[] result = restTemplate.getForObject(indicesEndpoint, Double[].class);

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
        List<UserRankingKeyProjection> userRankingList = userRepository.getUserRanking();
        UserRankingKeyProjection mostPredictUser = userRepository.getMostPredictUser();
        UserRankingKeyProjection mostWrongPredictUser = userRepository.getMostWrongPredictUser();
        UserRankingKeyProjection stockCodeMostPredictUSer = stockSubscribeRepository.getStockCodeMostPredictUSer();
        List<StockRankingProjection> stockRankingList = stockSubscribeRepository.getStockRanking();

        return new MainDto(userRankingList, stockRankingList, mostPredictUser, mostWrongPredictUser, stockCodeMostPredictUSer);
    }

    public MainIndiceDto mainIndices(){
        double[] indices;
        try {
            indices = getData();
            if (indices == null || indices.length == 0) {
                saveData();
                indices = getData();
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        return new MainIndiceDto(indices[0], indices[1], indices[2]);
    }
}

