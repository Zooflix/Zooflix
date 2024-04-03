package com.zooflix.be_zooflix.domain.predict.controller;

import com.zooflix.be_zooflix.domain.predict.dto.*;
import com.zooflix.be_zooflix.domain.predict.entity.Predict;
import com.zooflix.be_zooflix.domain.predict.service.PredictService;
import com.zooflix.be_zooflix.domain.stockSubscribe.dto.StockSubscribeDto;
import com.zooflix.be_zooflix.global.jwt.dto.CustomUserDetails;
import com.zooflix.be_zooflix.global.result.ResultResponse;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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
    public ResponseEntity<?> selectPredicts(@RequestParam String sorted, @RequestParam String stockName) {
        if (stockName.equals("null") || stockName.isEmpty()) { // 전체
            if (sorted.equals("userTem")) {
                List<PredictResDto> predicts = predictService.getSortedPredicts();
                return ResponseEntity.ok(predicts);
            } else if (sorted.equals("end")) {
                List<PredictResDto> predicts = predictService.getEndPredicts();
                return ResponseEntity.ok(predicts);
            } else {
                List<PredictResDto> predicts = predictService.getPredicts();
                return ResponseEntity.ok(predicts);
            }
        } else {
            if (sorted.equals("userTem")) {
                List<PredictResDto> selectedPredicts = predictService.getSortedPredictsByStockName(stockName);
                return ResponseEntity.ok(selectedPredicts);
            } else if (sorted.equals("end")) {
                List<PredictResDto> selectedPredicts = predictService.getEndPredictsByStockName(stockName);
                return ResponseEntity.ok(selectedPredicts);
            } else {
                List<PredictResDto> selectedPredicts = predictService.getPredictsByStockName(stockName);
                return ResponseEntity.ok(selectedPredicts);
            }

        }
    }

    @Operation(summary = "예측 글 작성")
    @PostMapping("/predict")
    public ResponseEntity<?> insertPredict(@RequestBody PredictReqDto predictReqDto, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        predictReqDto.setUserNo(customUserDetails.getUserNo());
        PredictResDto savedPredict = predictService.postPredict(predictReqDto);
        return ResponseEntity.ok(savedPredict);
    }

    @Operation(summary = "예측 가능 확인")
    @GetMapping("/predict/check")
    public boolean checkPredict(@RequestParam int userNo, @RequestParam String stockName) {
        return predictService.checkPredict(userNo, stockName);
    }

    @Operation(summary = "종가 업데이트")
    @PostMapping("predict/nxtvalue")
    public ResponseEntity<?> updateNxtValue() {
        predictService.postNxtValue();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "예측 글 삭제")
    @DeleteMapping("/predict/{pdNo}")
    public ResponseEntity<?> deletePredict(@PathVariable int pdNo) {
        predictService.deletePredict(pdNo);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
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

    @Operation(summary = "매매정보")
    @GetMapping("/predict/stock/{userNo}")
    public List<StockHistoryDto> selectStockHistory(@PathVariable int userNo) throws IOException {
        return predictService.getStockHistory(userNo);
    }

    @Operation(summary = "종목검색")
    @GetMapping("/predict/stock/search")
    public List<StockResponseProjection> selectStockSearch(@RequestParam String stockName) {
        return predictService.getStockSearch(stockName);
    }

    @Operation(summary = "현재가격")
    @GetMapping("/predict/prevalue")
    public Float selectNowPrice(@RequestParam String stockName) {
        return predictService.getNowPrice(stockName);
    }


    @Operation(summary = "주식목록 전체 저장")
    @GetMapping("/stock/list")
    public void saveStockList() {
        predictService.getStockList();
    }

    @Operation(summary = "이달의 주스트라다무스")
    @GetMapping("/predict/rank")
    public PredictRankDto selectZoostra(@RequestParam String stockName) {
        if (stockName.equals("null")) {
            return predictService.getZoostra();
        } else {
            return predictService.getZoostraByStockName(stockName);
        }
    }

}
