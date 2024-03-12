package com.zooflix.be_zooflix.domain.report.repository;

import com.zooflix.be_zooflix.domain.predict.entity.Predict;
import com.zooflix.be_zooflix.domain.report.entity.Report;
import com.zooflix.be_zooflix.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReportRepository extends JpaRepository<Report, Integer> {
    Optional<Report> findByUserAndPredict(User user, Predict predict);
}
