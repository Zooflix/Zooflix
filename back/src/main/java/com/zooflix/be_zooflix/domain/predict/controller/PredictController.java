package com.zooflix.be_zooflix.domain.predict.controller;

import com.zooflix.be_zooflix.domain.predict.dto.PredictDto;
import com.zooflix.be_zooflix.domain.predict.entity.Predict;
import com.zooflix.be_zooflix.domain.predict.service.PredictService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PredictController {

    private final PredictService predictService;

    @Autowired
    public PredictController(HttpServletRequest request, PredictService predictService){
        this.predictService = predictService;
    }

    //전체 예측 목록 조회 getPredicts()
    @GetMapping("/predict")
    public ResponseEntity<?> selectPredicts(HttpServletRequest request){
        List<Predict> predicts = predictService.getPredicts();
        return ResponseEntity.ok(predicts);
    }


    //종목명 검색

    @GetMapping("/predict/{stockName}")
    public ResponseEntity<?> selectPredictsByStockName(HttpServletRequest request,@PathVariable String stockName){
        List<Predict> selectedPredicts = predictService.getPredictsByStockName(stockName);
        return ResponseEntity.ok(selectedPredicts);
    }

    //예측 글 작성
    @PostMapping("/predict")
    public ResponseEntity<?> insertPredict(HttpServletRequest request, @RequestBody PredictDto predictDto){
        Predict savedPredict = predictService.postPredict(predictDto);
        return new ResponseEntity<>(savedPredict, HttpStatus.CREATED);
    }

    //예측 글 성공여부 업데이트
    @PostMapping("predict/result")
    public ResponseEntity<?> insertPredictResult() {
        predictService.postPredictResult();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //예측 글 삭제
    @DeleteMapping("/predict/{pdNo}")
    public ResponseEntity<?> deletePredict(HttpServletRequest request, @PathVariable Integer pdNo){
        predictService.deletePredict(pdNo);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
