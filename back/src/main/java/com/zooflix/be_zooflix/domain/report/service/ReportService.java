package com.zooflix.be_zooflix.domain.report.service;

import com.zooflix.be_zooflix.domain.predict.dto.PredictResDto;
import com.zooflix.be_zooflix.domain.predict.entity.Predict;
import com.zooflix.be_zooflix.domain.predict.repository.PredictRepository;
import com.zooflix.be_zooflix.domain.report.entity.Report;
import com.zooflix.be_zooflix.domain.report.entity.ReportType;
import com.zooflix.be_zooflix.domain.report.repository.ReportRepository;
import com.zooflix.be_zooflix.domain.user.entity.User;
import com.zooflix.be_zooflix.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReportService {

    private final UserRepository userRepository;
    private final PredictRepository predictRepository;
    private final ReportRepository reportRepository;

    //예측글 신고하기
    public PredictResDto reportPredict(int pdNo, String reportTypeString, int userNo){
        try{
            Predict predict = predictRepository.findById(pdNo).orElse(null);
            User user = userRepository.findMyInfo(userNo);

            if (predict == null || user == null || reportTypeString == null) {
                // 예외 처리: 필요한 값이 null인 경우
                log.error("Null value found: predict={}, user={}, reportTypeString={}", predict, user, reportTypeString);
                return null;
            }
            ReportType reportType = ReportType.valueOf(reportTypeString);

            Optional<Report> report = reportRepository.findByUserNoAndPdNo(user, predict);
            if(report.isPresent()){
                report.get().setReportType(reportType);
                reportRepository.save(report.get());
            }
            return predict.toDto2();
        }catch (Exception e){
            e.printStackTrace();
        }
        log.info("게시글이 성공적으로 신고되었습니다!");
        return null;
    }
}