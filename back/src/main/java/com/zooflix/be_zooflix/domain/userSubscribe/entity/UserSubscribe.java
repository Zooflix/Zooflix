package com.zooflix.be_zooflix.domain.userSubscribe.entity;

import com.zooflix.be_zooflix.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity(name = "user_subscribe")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter @Setter
public class UserSubscribe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subscribe_no", nullable = false)
    private int subscribeNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_no", nullable = false)
    private User user;

    @Column(name = "subscribe_user_no", nullable = false)
    private int subscribeUserNo;

    @Column(name = "subscribe_create")
    private LocalDate subscribeCreate;

}
