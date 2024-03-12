package com.zooflix.be_zooflix.domain.report.controller;

import com.zooflix.be_zooflix.domain.predict.dto.PredictResDto;
import com.zooflix.be_zooflix.domain.report.service.ReportService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping("/predict/report/{userId}/{pdNo}")
    public ResponseEntity<String> reportPd(@PathVariable("user_id")String userId, @PathVariable("pd_no")int pdNo, @RequestBody Map<String, String> payload){
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
