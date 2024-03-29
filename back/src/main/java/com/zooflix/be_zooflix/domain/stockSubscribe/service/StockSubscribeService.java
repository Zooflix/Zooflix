package com.zooflix.be_zooflix.domain.stockSubscribe.service;

import com.zooflix.be_zooflix.domain.alarm.entity.AlarmTypeStatus;
import com.zooflix.be_zooflix.domain.alarm.service.AlarmService;
import com.zooflix.be_zooflix.domain.stockSubscribe.dto.StockSubscribeDto;
import com.zooflix.be_zooflix.domain.stockSubscribe.dto.request.AddStockSubscribeRequest;
import com.zooflix.be_zooflix.domain.stockSubscribe.repository.StockSubscribeRepository;
import com.zooflix.be_zooflix.domain.user.dto.UserKeyProjection;
import com.zooflix.be_zooflix.domain.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import com.zooflix.be_zooflix.domain.user.entity.User;
import com.zooflix.be_zooflix.domain.stockSubscribe.entity.StockSubscribe;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class StockSubscribeService {
    private final UserRepository userRepository;
    private final StockSubscribeRepository stockSubscribeRepository;
    private final AlarmService alarmService;

    /**
     * 3.1 주식 정기 구독
     *
     */
    @Transactional
    public int postSubscribe(AddStockSubscribeRequest request) {
        User user = userRepository.findByUserId(request.getUserId());

        if (user.getUserAppKey() == null) {
            user.userUpdateKey(
                    user.getUserId(),   //추가됨
                    user.getUserName(),
                    user.getUserPw(),
                    request.getUserAppKey(),
                    request.getUserSecretKey(),
                    request.getUserAccount()
            );
        }
        userRepository.save(user);

        StockSubscribe subscribe = StockSubscribe.createStockSubscribe(
                user,
                request.getStockCode(),
                request.getStockName(),
                request.getStockCount(),
                request.getStockSubscribeDay()
        );

        subscribe = stockSubscribeRepository.save(subscribe);

        //매매일 전날에 알림을 보내는 메서드
//        String content = "내일은 " + subscribe.getStockName() + " 주식을 정기 구독한 날입니다!";
//        alarmService.send(user, content, AlarmTypeStatus.TOMORROW);

        return subscribe.getStockCode();
    }

    /**
     * 3.2 주식 정기 구독 해지
     *
     */
    public int terminationSubscribe(int stockSubscribeNo, int userNo){
        StockSubscribe subscribe = stockSubscribeRepository.findByStockSubscribeNo(stockSubscribeNo);
        if (userNo != subscribe.getUser().getUserNo()) {
            throw new RuntimeException("토큰 정보와 일치하는 유저가 아닙니다!");
        }
        stockSubscribeRepository.delete(subscribe);

        //예약주문된 내역이 있다면 주문취소하기

        return stockSubscribeNo;
    }

    /**
     * 3.3 주식 구독 목록 조회
     *
     */
    public List<StockSubscribeDto> subscribeList(String userId){
        User user = userRepository.findByUserId(userId);

        List<StockSubscribe> subscribes = stockSubscribeRepository.findByUser(user.getUserNo());

        if(subscribes.isEmpty()) {
            throw new RuntimeException("주식 구독 내역이 존재하지 않습니다.");
        }

        List<StockSubscribeDto> response = subscribes.stream()
                .map(this::convertToStockSubscribeDto)
                .collect(Collectors.toList());;

        return response;
    }

    public boolean checkApiKey(int userNo) {
        UserKeyProjection userKey = userRepository.findByUserNo(userNo);
        return userKey.getUserAccount() != null && userKey.getUserAppKey() != null && userKey.getUserSecretKey() != null;
    }

    private StockSubscribeDto convertToStockSubscribeDto(StockSubscribe stockSubscribe) {
        StockSubscribeDto dto = new StockSubscribeDto();
        dto.setStockSubscribeNo(stockSubscribe.getStockSubscribeNo());
        dto.setStockCode(stockSubscribe.getStockCode());
        dto.setStockName(stockSubscribe.getStockName());
        dto.setStockCount(stockSubscribe.getStockCount());
        dto.setStockSubscribeDay(stockSubscribe.getStockSubscribeDay());
        dto.setStockSubscribeCreate(stockSubscribe.getStockSubscribeCreate());
        dto.setUserId(stockSubscribe.getUser().getUserId());
        return dto;
    }

}

