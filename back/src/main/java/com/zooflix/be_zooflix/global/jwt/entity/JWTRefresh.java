package com.zooflix.be_zooflix.global.jwt.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "auth")
@Getter
@Setter
public class JWTRefresh {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long refreshNo;
    @Column
    private String userId;
    @Column(length = 500)
    private String refreshToken;
    @Column
    private String expiration;

}
