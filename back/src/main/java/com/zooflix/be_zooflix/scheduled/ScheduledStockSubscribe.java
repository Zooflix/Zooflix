package com.zooflix.be_zooflix.scheduled;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledStockSubscribe {
// 매일 정해진 시간에 다음날 구독된 주식 한투 API로 예약주문
    @Scheduled(cron = "0 0 0 * * *") // 매일 자정에 실행
    public void performTask() {
        // 실행할 코드 작성

    }
}
