package com.zooflix.be_zooflix.domain.predict.service;

import com.zooflix.be_zooflix.domain.predict.entity.Predict;
import com.zooflix.be_zooflix.domain.predict.repository.PredictRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PredictService {

    private final PredictRepository predictRepository;

    @Autowired
    public  PredictService(PredictRepository predictRepository){
        this.predictRepository = predictRepository;
    }

    //전체 예측 목록 조회
    public List<Predict> getPredict(){
        return predictRepository.findAll();
    }

    //종목명 검색
    public List<Predict> getPredictByStockName(String stockName){
        return predictRepository.findeByStockName(stockName);
    }

    //예측 글 작성
    public Predict postPredict(Predict predict){
        return predictRepository.save(predict);
    }

    //예측 글 성공여부 업데이트
//    @Scheduled(cron = "0 30 15 ? * MON-FRI") //평일 15:30 마다
//    public Predict putPredict(Integer pdNo, String pdResult){
//        Optional<Predict> optionalPredict = predictRepository.findById(pdNo);
//
//
//    }

    //예측 글 삭제
    public void deletePredict(Integer pdNo){
        predictRepository.deleteById(pdNo);
    }

}
