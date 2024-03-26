package com.zooflix.be_zooflix.domain.radio.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class Radio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "news_no", nullable = false)
    private int newsNo;

    @Column(name = "news_content", nullable = false)
    private String newsContent; // 기사 요약 내용

    @Column(name = "news_save_time", nullable = false)
    private LocalDateTime newsSaveTime; // 뉴스 저장 및 갱신 시간


}
