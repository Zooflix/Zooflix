package com.zooflix.be_zooflix.domain.predict.entity;

import com.zooflix.be_zooflix.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.util.Date;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Table(name = "prediction")
@Getter @Setter
public class Predict {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pd_no", nullable = false)
    private int pdNo;

    @Column(name = "stock_name", nullable = false)
    private String stockName; //종목명

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_no")
//    private User user;
    @Column(name = "user_no")
    private int userNo; //유저기본키

    @Column(name = "create_date", nullable = false)
    private LocalDate createDate; //글쓴날짜

    @Column(name = "pd_date", nullable = false)
    private LocalDate pdDate; //예측날짜

    @Column(name = "pd_value", nullable = false)
    private int pdValue; //가격예측값

    @Column(name = "pd_content")
    private String pdContent; //예측 근거

    @Column(name = "pd_result")
    private String pdResult; //예측 결과

    @Column(name = "pre_value")
    private int preValue; //예측시작시 시장가

    @Column(name = "nxt_value")
    private int nxtValue; //예측 날짜 실제시장가

    @Column(name = "pd_updown")
    private boolean pdUpDown; //상승or하락
}

