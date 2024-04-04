package com.zooflix.be_zooflix.domain.main.dto;

public interface UserRankingKeyProjection {
    int getUserNo();
    String getUserName();
    int getPredictCount();
    int getSuccessCount();
    int getFailCount();
    double getUserTemperature();
    String getUserZbti();
    int getSuccessStreak();
    int getCnt();
}
