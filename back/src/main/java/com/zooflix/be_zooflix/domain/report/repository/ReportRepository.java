package com.zooflix.be_zooflix.domain.report.repository;

import com.zooflix.be_zooflix.domain.predict.entity.Predict;
import com.zooflix.be_zooflix.domain.report.entity.Report;
import com.zooflix.be_zooflix.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {
    Optional<Report> findByUserNoAndPdNo(User userNo, Predict predictNo);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(nativeQuery = true, value = "delete from report r where r.user_no = :userNo")
    void deleteAllByUser(int userNo);
}
