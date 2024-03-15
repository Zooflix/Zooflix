package com.zooflix.be_zooflix.domain.predict.controller;

import com.zooflix.be_zooflix.domain.predict.dto.PredictReqDto;
import com.zooflix.be_zooflix.domain.predict.dto.PredictResDto;
import com.zooflix.be_zooflix.domain.predict.entity.Predict;
import com.zooflix.be_zooflix.domain.predict.service.PredictService;
import com.zooflix.be_zooflix.domain.stockSubscribe.dto.StockSubscribeDto;
import com.zooflix.be_zooflix.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
public class PredictController {

    private final PredictService predictService;

    @Autowired
    public PredictController(PredictService predictService) {
        this.predictService = predictService;
    }

    @Operation(summary = "전체 예측 글 조회")
    @GetMapping("/predict")
    public ResponseEntity<?> selectPredicts(@RequestParam String sorted) {
        if (!sorted.equals("userTem")) {
            List<PredictResDto> predicts = predictService.getPredicts();
            return ResponseEntity.ok(predicts);
        } else {
            List<PredictResDto> predicts = predictService.getSortedPredicts();
            return ResponseEntity.ok(predicts);
        }
    }


    @Operation(summary = "종목명 검색")
    @GetMapping("/predict/{stockName}")
    public ResponseEntity<?> selectPredictsByStockName(@PathVariable String stockName,@RequestParam String sorted) {
        if (!sorted.equals("userTem")) {
            List<PredictResDto> selectedPredicts = predictService.getPredictsByStockName(stockName);
            return ResponseEntity.ok(selectedPredicts);
        } else {
            List<PredictResDto> selectedPredicts = predictService.getSortedPredictsByStockName(stockName);
            return ResponseEntity.ok(selectedPredicts);
        }
    }

    @Operation(summary = "예측 글 작성")
    @PostMapping("/predict")
    public ResponseEntity<?> insertPredict(@RequestBody PredictReqDto predictReqDto) {
        PredictResDto savedPredict = predictService.postPredict(predictReqDto);
        return ResponseEntity.ok(savedPredict);
    }

    @Operation(summary = "종가 업데이트")
    @PostMapping("predict/nxtvalue")
    public ResponseEntity<?> updateNxtValue() {
        predictService.postNxtValue();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "예측 성공 업데이트")
    @PostMapping("predict/result")
    public ResponseEntity<?> updatePredictResult() {
        predictService.postPredictResult();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "예측 글 삭제")
    @DeleteMapping("/predict/{pdNo}")
    public ResponseEntity<?> deletePredict(@PathVariable int pdNo) {
        predictService.deletePredict(pdNo);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/predict/getprice")
    public int selectClosingPrice(@RequestParam String stockName, @RequestParam String date) {
        return predictService.getClosingPrice(stockName, date);
    }

    @Operation(summary = "종목 차트")
    @GetMapping("/predict/graph")
    public String selectGraph(@RequestParam String stockName) {
        return predictService.getGraph(stockName);
    }

    @Operation(summary = "종목과 예측 차트 비교")
    @GetMapping("/predict/graph/{userNo}")
    public String selectCompareGraph(@PathVariable int userNo, @RequestParam String stockName) {
        return predictService.getCompareGraph(userNo, stockName);
    }



}
