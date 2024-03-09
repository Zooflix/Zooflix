package com.zooflix.be_zooflix.domain.predict.service;

import com.zooflix.be_zooflix.domain.myPage.dto.response.MyPredictionDto;
import com.zooflix.be_zooflix.domain.predict.entity.Predict;
import com.zooflix.be_zooflix.domain.predict.repository.PredictRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    //my page 에서 보여줄 내 예측 글 정보담기
    public List<MyPredictionDto> getMyPredictByNo(int userNo) {
        List<Predict> myPredict= predictRepository.findMyPredict(userNo);
        if(myPredict.isEmpty()){//내 예측이 존재하지 않으면
            throw new NullPointerException("예측이 존재하지 않습니다.");
        }

        List<MyPredictionDto> myPredictList = new ArrayList<>();

        for(int i = 0; i < myPredict.size(); i++) {
            myPredictList.get(i).setStockName(myPredict.get(i).getStockName());
            myPredictList.get(i).setPdValue(myPredict.get(i).getPdValue());
            myPredictList.get(i).setPdUpDown(myPredict.get(i).isPdUpDown());
            myPredictList.get(i).setPdDate(myPredict.get(i).getPdDate());
            myPredictList.get(i).setPdResult(myPredict.get(i).getPdResult());
            myPredictList.get(i).setPdContent(myPredict.get(i).getPdContent());
        }

        return myPredictList;
    }

}
