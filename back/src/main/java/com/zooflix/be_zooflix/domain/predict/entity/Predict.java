package com.zooflix.be_zooflix.domain.predict.entity;

import com.zooflix.be_zooflix.domain.predict.dto.PredictResDto;
import com.zooflix.be_zooflix.domain.user.entity.User;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter @Setter
@ToString
public class Predict {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pd_no", nullable = false)
    private int pdNo;

    @Column(name = "stock_name", nullable = false)
    private String stockName; //종목명

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_no")
    private User user;

    @Column(name = "create_date", nullable = false)
    private LocalDateTime createDate; //글쓴날짜

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


    public PredictResDto toDto2(){
        PredictResDto dto = new PredictResDto();
        dto.setPdNo(this.pdNo);
        dto.setPdContent(this.pdContent);
        return dto;
    }

}
