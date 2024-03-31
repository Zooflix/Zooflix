package com.zooflix.be_zooflix.domain.stockSubscribe.entity;

import com.zooflix.be_zooflix.domain.user.entity.User;
import com.zooflix.be_zooflix.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Getter
@Entity
public class StockSubscribe extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int stockSubscribeNo;
    @Column
    private String stockCode;
    @Column
    private String stockName;
    @Column
    private int stockCount;
    @Column
    private int stockSubscribeDay;
    @CreatedDate
    @Column
    private LocalDateTime stockSubscribeCreate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_no")
    private User user; // 유저

    public static StockSubscribe createStockSubscribe(
            User user,
            String stockCode,
            String stockName,
            int stockCount,
            int stockSubscribeDay
    ) {
        StockSubscribe subscribe = new StockSubscribe();
        subscribe.user = user;
        subscribe.stockCode = stockCode;
        subscribe.stockName = stockName;
        subscribe.stockCount = stockCount;
        subscribe.stockSubscribeDay = stockSubscribeDay;

        return subscribe;
    }
}

