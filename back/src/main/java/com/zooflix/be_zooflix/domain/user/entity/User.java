package com.zooflix.be_zooflix.domain.user.entity;

import com.zooflix.be_zooflix.domain.alarm.entity.Alarm;
import com.zooflix.be_zooflix.domain.predict.entity.Predict;
import com.zooflix.be_zooflix.domain.report.entity.Report;
import com.zooflix.be_zooflix.domain.stockSubscribe.entity.StockSubscribe;
import com.zooflix.be_zooflix.domain.userSubscribe.entity.UserSubscribe;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userNo;

    @Column(unique = true)
    private String userId;
    @Column
    private String userPw;
    @Column(unique = true)
    private String userName;
    @Column
    private int reportCount = 0;
    @Column
    private LocalDateTime reportDate;
    @Column
    private int predictCount = 0;
    @Column
    private int successCount = 0;
    @Column
    private int failCount = 0;
    @Column
    private double userTemperature = 30.0;
    @Column
    private String userZbti;
    @Column
    private int successStreak = 0;
    @CreatedDate
    @Column
    private LocalDateTime userCreate;
    @Column(length = 150)
    private String userAppKey;
    @Column(length = 450)
    private String userSecretKey;
    @Column(length = 200)
    private String userAccount;
    @Column
    private String userRole;
    @Column(length = 1000)
    private String userToken;
    @Column
    private LocalDateTime userTokenDate;

    public void userUpdate(String userId, String userName, String userPw) {
        this.userId = userId;
        this.userName = userName;
        this.userPw = userPw;
    }

    public void userUpdateKey(String userId, String userName, String userPw, String userAppKey, String userSecretKey, String userAccount) {
        this.userId = userId;
        this.userName = userName;
        this.userPw = userPw;
        this.userAppKey = userAppKey;
        this.userSecretKey = userSecretKey;
        this.userAccount = userAccount;
    }

    public void userUpdateToken(String userToken, LocalDateTime userTokenDate) {
        this.userToken = userToken;
        this.userTokenDate = userTokenDate;
    }

    public void userUpdateZbti(String userZbti) {
        this.userZbti = userZbti;
    }

//    //join 문에 활용
//    @OneToMany(mappedBy = "user")
//    private List<UserSubscribe> userSubscribes;

}
