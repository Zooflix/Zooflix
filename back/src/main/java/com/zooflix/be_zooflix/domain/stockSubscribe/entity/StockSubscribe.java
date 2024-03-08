package com.zooflix.be_zooflix.domain.stockSubscribe.entity;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Entity
public class StockSubscribe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int stockNo;
    @Column
    private String stockName;

    @Column
    private int stockCount;
    @Column
    private int stockDate;
    @CreatedDate
    @Column
    private LocalDateTime stockSubscribeCreate;
    @Column
    private int stockTotalPrice;
    @Column
    private int stockTotalCount;
}

