package com.zooflix.be_zooflix.domain.predict.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class StockList {
    @Id
    @Column(name = "stock_no", nullable = false)
    private String stockCode; // 종목번호

    @Column(name = "stock_name", nullable = false)
    private String stockName; // 종목명
}