package com.zooflix.be_zooflix.domain.report.service;

import com.zooflix.be_zooflix.domain.predict.dto.PredictDto;
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
@RequiredArgsConstructor
@Slf4j
public class ReportService {

    private final UserRepository userRepository;
    private final PredictRepository predictRepository;
    private final ReportRepository reportRepository;

    //예측글 신고하기
    public PredictDto reportPredict(int pdNo, String reportTypeString, String userId){
        try{
            Predict predict = predictRepository.findById(pdNo).orElse(null);
            User user = userRepository.findByUserId(userId);

            ReportType reportType = ReportType.valueOf(reportTypeString);

            Optional<Report> report = reportRepository.findByUserAndPredict(user, predict);
            if(report.isPresent()){
                report.get().setReportType(reportType);
                reportRepository.save(report.get());
            }else{

            }
//            return predict.toDto();
        }catch (Exception e){
            e.printStackTrace();
        }
        log.info("게시글이 성공적으로 신고되었습니다!");
        return null;
    }
}
