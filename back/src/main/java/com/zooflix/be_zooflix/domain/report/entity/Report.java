//package com.zooflix.be_zooflix.domain.report.entity;
//
//import com.zooflix.be_zooflix.domain.predict.entity.Predict;
//import com.zooflix.be_zooflix.domain.user.entity.User;
//import jakarta.persistence.*;
//import lombok.AccessLevel;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//import java.time.LocalDateTime;
//
//@AllArgsConstructor
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
//@Data
//@Entity(name = "report")
//public class Report {
//
//    @Id
//    @Column(name = "report_no")
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int reportNo; //신고 번호
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_no", nullable = false)
//    private User userNo; //유저 기본키
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "pd_no", nullable = false)
//    private Predict pdNo; //예측 기본키
//
//    @Enumerated(EnumType.STRING)
//    @Column(name = "report_type", nullable = false)
//    private ReportType reportType; //신고 타입
//
//    @Column(name = "report_content")
//    private String reportContent; //신고 사유
//
//    @Column(name = "report_create")
//    private LocalDateTime reportCreate; //신고날짜
//
//
//
//
//}
