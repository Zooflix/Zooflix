package com.zooflix.be_zooflix.domain.stockSubscribe.entity;

import com.zooflix.be_zooflix.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Getter
@Entity
public class StockPurchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int purchaseNo;
    @Column
    private String stockCode;
    @Column
    private String stockName;
    @Column
    private int stockCount;
    @Column
    private int purchasePrice;
    @CreatedDate
    @Column
    private int purchaseDate;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_no")
    private User user; // 유저
}
