package com.zooflix.be_zooflix.domain.userSubscribe.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter @Setter
public class UserSubscribe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subscribe_no", nullable = false)
    private int subscribeNo;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_no", nullable = false)
    @Column(name = "user_no", nullable = false)
    private int userNo;

    @Column(name = "subscribe_id")
    private String subscribeId;

    @Column(name = "subscribe_create")
    private LocalDate subscribeCreate;

}
