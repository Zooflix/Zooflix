package com.zooflix.be_zooflix.domain.report.controller;

import com.zooflix.be_zooflix.domain.predict.dto.PredictResDto;
import com.zooflix.be_zooflix.domain.report.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class ReportController {

    private final ReportService reportService;


    @PostMapping("/predict/report/{userId}/{pdNo}")
    @Operation(summary = "예측글 신고")
    public ResponseEntity<String> reportPd(@PathVariable("userId")String userId, @PathVariable("pdNo")int pdNo, @RequestBody Map<String, String> payload){
        try{
            String reportReasonString = payload.get("reportReason");
            PredictResDto reportPdDto = reportService.reportPredict(pdNo, reportReasonString, userId);

            if(reportPdDto != null){
                return ResponseEntity.ok("게시글 성공적으로 신고되었습니다!");
            }else{
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시글 신고에 실패했습니다.");
            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시글 신고에 실패했습니다.");
        }
    }
}