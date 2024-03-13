package com.zooflix.be_zooflix.domain.user.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

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
    private String refreshToken;
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
    @Column
    private String userAppKey;
    @Column
    private String userSecretKey;
    @Column
    private String userAccount;


    public void userUpdate(String userName, String userPw) {
        this.userName = userName;
        this.userPw = userPw;
    }

    public void userUpdateKey(String userName, String userPw, String userAppKey, String userSecretKey, String userAccount) {
        this.userName = userName;
        this.userPw = userPw;
        this.userAppKey = userAppKey;
        this.userSecretKey = userSecretKey;
        this.userAccount = userAccount;
    }

    public void userUpdateZbit(String userZbti) {
        this.userZbti = userZbti;
    }

//    //join 문에 활용
//    @OneToMany(mappedBy = "user")
//    private List<UserSubscribe> userSubscribes;

}
