package com.zooflix.be_zooflix.domain.predict.service;

import com.zooflix.be_zooflix.domain.myPage.dto.response.MyPredictionDto;
import com.zooflix.be_zooflix.domain.predict.entity.Predict;
import com.zooflix.be_zooflix.domain.predict.repository.PredictRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class PredictService {

    private final PredictRepository predictRepository;

    @Autowired
    public  PredictService(PredictRepository predictRepository){
        this.predictRepository = predictRepository;
    }

    //전체 예측 목록 조회
    public List<Predict> getPredicts(){
        return predictRepository.findAll();
    }

    //종목명 검색
    public List<Predict> getPredictsByStockName(String stockName){
        return predictRepository.findByStockName(stockName);
    }

    //예측 글 작성
    public Predict postPredict(Predict predict){
        return predictRepository.save(predict);
    }

    //예측 글 성공여부 업데이트
    @Scheduled(cron = "0 30 15 ? * MON-FRI")
    public void postPredictResult(){
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
    public void deletePredict(Integer pdNo){
        predictRepository.deleteById(pdNo);
    }

}
