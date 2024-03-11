package com.zooflix.be_zooflix.domain.myPage.service;

import com.zooflix.be_zooflix.domain.myPage.dto.response.MyInfoDto;
import com.zooflix.be_zooflix.domain.myPage.repository.MyPageRepository;
import com.zooflix.be_zooflix.domain.predict.repository.PredictRepository;
import com.zooflix.be_zooflix.domain.stockSubscribe.repository.StockSubscribeRepository;
import com.zooflix.be_zooflix.domain.user.entity.User;
import com.zooflix.be_zooflix.domain.user.repository.UserRepository;
import com.zooflix.be_zooflix.domain.userSubscribe.repository.UserSubscribeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MyPageService {


}
