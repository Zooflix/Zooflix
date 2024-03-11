package com.zooflix.be_zooflix.domain.stockSubscribe.entity;

import com.zooflix.be_zooflix.domain.user.entity.User;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_no")
    private User user; // 유저

    public static StockSubscribe createStockSubscribe(
            User user,
            String stockName,
            int stockCount,
            int subscribeDate
    ) {
        StockSubscribe subscribe = new StockSubscribe();
        subscribe.user = user;
        subscribe.stockName = stockName;
        subscribe.stockCount = stockCount;
        subscribe.stockDate = subscribeDate;

        return subscribe;
    }

}

