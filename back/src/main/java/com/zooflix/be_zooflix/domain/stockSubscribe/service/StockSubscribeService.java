package com.zooflix.be_zooflix.domain.stockSubscribe.service;

import com.zooflix.be_zooflix.domain.stockSubscribe.dto.request.AddStockSubscribeRequest;
import com.zooflix.be_zooflix.domain.stockSubscribe.repository.StockSubscribeRepository;
import com.zooflix.be_zooflix.domain.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import com.zooflix.be_zooflix.domain.user.entity.User;
import com.zooflix.be_zooflix.domain.stockSubscribe.entity.StockSubscribe;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StockSubscribeService {
    private final UserRepository userRepository;
    private final StockSubscribeRepository stockSubscribeRepository;
    /**
     * 3.1 피드 작성
     *
     */
    @Transactional
    public int postSubscribe(AddStockSubscribeRequest request) {
        User user = getUser(request.getUserNo());
        StockSubscribe subscribe = StockSubscribe.createStockSubscribe(
                user,
                request.getStockName(),
                request.getStockCount(),
                request.getSubscribeDate()
        );

        stockSubscribeRepository.save(subscribe);

        //user에 appkey 저장 마이페이지 정보수정 이용
        

        return request.getUserNo();
    }

    private User getUser(int userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("해당하는 유저가 존재하지 않습니다"));
    }
}

