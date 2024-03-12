package com.zooflix.be_zooflix.domain.predict.service;

import com.zooflix.be_zooflix.domain.predict.dto.PredictReqDto;

import com.zooflix.be_zooflix.domain.predict.dto.PredictResDto;
import com.zooflix.be_zooflix.domain.predict.entity.Predict;
import com.zooflix.be_zooflix.domain.predict.repository.PredictRepository;

import com.zooflix.be_zooflix.domain.user.entity.User;
import com.zooflix.be_zooflix.domain.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PredictService {

    private final PredictRepository predictRepository;
    private final UserRepository userRepository;

    @Autowired
    public PredictService(PredictRepository predictRepository, UserRepository userRepository) {
        this.predictRepository = predictRepository;
        this.userRepository = userRepository;
    }

    //전체 예측 목록 조회
    public List<PredictResDto> getPredicts() {
        List<Predict> predicts = predictRepository.findAll();
        return predicts.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<PredictResDto> getSortedPredicts() {
        List<Predict> predicts = predictRepository.findByAllOrderByUserTem();
        return predicts.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    //종목명 검색
    public List<PredictResDto> getPredictsByStockName(String stockName) {
        List<Predict> predicts = predictRepository.findByStockName(stockName);
        return predicts.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<PredictResDto> getSortedPredictsByStockName(String stockName) {
        List<Predict> predicts = predictRepository.findByStockNameOrderByUserTem(stockName);
        return predicts.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }


    //예측 글 작성
    public PredictResDto postPredict(PredictReqDto dto) {
        Predict predict = Predict.builder()
                .stockName(dto.getStockName())
                .user(userRepository.findMyInfo(dto.getUserNo()))
                .createDate(LocalDateTime.now())
                .pdDate(dto.getPdDate())
                .pdValue(dto.getPdValue())
                .pdContent(dto.getPdContent())
                .preValue(dto.getPreValue())
                .pdUpDown(dto.isPdUpDown())
                .build();
        return toDto(predictRepository.save(predict));
    }

    //종가 업데이트
    @Scheduled(cron = "0 30 15 ? * MON-FRI")
    public void postNxtValue() {
        LocalDate today = LocalDate.now();
        List<Predict> todayPredictions = predictRepository.findByPdDate(today);
        for (Predict prediction : todayPredictions) {
            int nxtValue = 5000; //파이썬에서 값받아오기
                prediction.setNxtValue(nxtValue);
            predictRepository.save(prediction);
        }

    }

    //예측 글 성공여부 업데이트
    @Scheduled(cron = "30 30 15 ? * MON-FRI")
    public void postPredictResult() {
        LocalDate today = LocalDate.now();
        List<Predict> todayPredictions = predictRepository.findByPdDate(today);
        for (Predict prediction : todayPredictions) {
            if (isSuccessful(prediction)) {
                prediction.setPdResult("성공");
            } else {
                prediction.setPdResult("실패");
            }
            predictRepository.save(prediction);
        }

    }

    private boolean isSuccessful(Predict prediction) {
        int pdValue = prediction.getPdValue();
        int nxtValue = prediction.getNxtValue();
        double differencePercentage = Math.abs((nxtValue - pdValue) / (double) pdValue);
        return differencePercentage <= 0.01; // 1% 내외
    }

    //예측 글 삭제
    public void deletePredict(Integer pdNo) {
        predictRepository.deleteById(pdNo);
    }

    public PredictResDto toDto(Predict predict){
        return PredictResDto.builder()
                .pdNo(predict.getPdNo())
                .stockName(predict.getStockName())
                .userNo(predict.getUser().getUserNo())
                .userName(predict.getUser().getUserName())
                .userTem(predict.getUser().getUserTemperature())
                .createDate(predict.getCreateDate())
                .pdDate(predict.getPdDate())
                .pdValue(predict.getPdValue())
                .pdContent(predict.getPdContent())
                .pdResult(predict.getPdResult())
                .preValue(predict.getPreValue())
                .nxtValue(predict.getNxtValue())
                .pdUpDown(predict.isPdUpDown())
                .build();
    }
}
