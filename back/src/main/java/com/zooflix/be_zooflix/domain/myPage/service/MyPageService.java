package com.zooflix.be_zooflix.domain.myPage.service;

import com.zooflix.be_zooflix.domain.myPage.dto.response.MyStockDto;
import com.zooflix.be_zooflix.domain.myPage.dto.response.MySubscribeDto;
import com.zooflix.be_zooflix.domain.myPage.dto.response.MyInfoDto;
import com.zooflix.be_zooflix.domain.myPage.dto.response.MyPredictionDto;
import com.zooflix.be_zooflix.domain.predict.entity.Predict;
import com.zooflix.be_zooflix.domain.predict.repository.PredictRepository;
import com.zooflix.be_zooflix.domain.stockSubscribe.entity.StockSubscribe;
import com.zooflix.be_zooflix.domain.stockSubscribe.repository.StockSubscribeRepository;
import com.zooflix.be_zooflix.domain.user.dto.UserNameTemperatureDto;
import com.zooflix.be_zooflix.domain.user.entity.User;
import com.zooflix.be_zooflix.domain.user.repository.UserRepository;
import com.zooflix.be_zooflix.domain.userSubscribe.entity.UserSubscribe;
import com.zooflix.be_zooflix.domain.userSubscribe.repository.UserSubscribeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class MyPageService {

    private final PredictRepository predictRepository;
    private final UserRepository userRepository;
    private final UserSubscribeRepository userSubscribeRepository;
    private final StockSubscribeRepository stockSubscribeRepository;

    public MyPageService(PredictRepository predictRepository, UserRepository userRepository, UserSubscribeRepository userSubscribeRepository, StockSubscribeRepository stockSubscribeRepository) {
        this.predictRepository = predictRepository;
        this.userRepository = userRepository;
        this.userSubscribeRepository = userSubscribeRepository;
        this.stockSubscribeRepository = stockSubscribeRepository;
    }

    // 내 정보
    public MyInfoDto getMyInfo(int userNo) {
        User user = userRepository.findMyInfo(userNo);
        if( user == null) {
            throw new NullPointerException("존재하지 않은 유저입니다.");
        }

        // 나를 구독한 사람 목록
        List<UserSubscribe> subscribeToMe = userSubscribeRepository.findSubscribeToMe(userNo);

        // 내가 구독한 사람 목록
        List<UserSubscribe> subscribeFromMe = userSubscribeRepository.findSubscribeFromMe(userNo);

        // 나를 구독한 사람의 수
        int subscribeToMeCount = subscribeToMe.size();

        // 내가 구독한 사람의 수
        int subscribeFromMeCount = subscribeFromMe.size();

        MyInfoDto myInfo = new MyInfoDto();

        myInfo.setUserName(user.getUserName());
        myInfo.setUserTemperature(user.getUserTemperature());
        myInfo.setPredictCount(user.getPredictCount());
        myInfo.setPredictionRate(Math.round((double)user.getSuccessCount()/user.getPredictCount() * 100));
        myInfo.setSuccessCount(user.getSuccessCount());
        myInfo.setSubscribeFromMe(subscribeFromMeCount);
        myInfo.setSubscribeToMe(subscribeToMeCount);

        return myInfo;
    }
    //내 예측 글 정보담기
    public List<MyPredictionDto> getMyPredictByNo(int userNo) {
        List<Predict> myPredict= predictRepository.findMyPredictList(userNo);

        if(myPredict.isEmpty()){//내 예측이 존재하지 않으면
            throw new NullPointerException("예측이 존재하지 않습니다.");
        }

        List<MyPredictionDto> myPredictList = new ArrayList<>();

        for (Predict value : myPredict) {
            MyPredictionDto myPredictionDto = new MyPredictionDto();

            myPredictionDto.setStockName(value.getStockName());
            myPredictionDto.setPdValue(value.getPdValue());
            myPredictionDto.setPdUpDown(value.isPdUpDown());
            myPredictionDto.setPdDate(value.getPdDate());
            myPredictionDto.setPdResult(value.getPdResult());
            myPredictionDto.setPdContent(value.getPdContent());
            myPredictList.add(myPredictionDto);
        }


        return myPredictList;
    }

    //내가 구독 중인 회원
    public List<MySubscribeDto> getMySubscribe(int userNo) {
        List<UserSubscribe> userSubscribes = userSubscribeRepository.findSubscribeFromMe(userNo);
        if(userSubscribes.isEmpty()) {
            throw  new NullPointerException("현재 구독 목록이 없습니다.");
        }

        List<MySubscribeDto> mySubscribeList = new ArrayList<>(userSubscribes.size());

        //mySubscribeList 추가
        for(int i = 0; i < userSubscribes.size(); i++){
            UserNameTemperatureDto userNameTemperature =
                    userRepository.findByUserName(userSubscribes.get(i).getSubscribeName());
            mySubscribeList.get(i).setSubscribeName(userNameTemperature.getUserName());
            mySubscribeList.get(i).setSubscribeTemperature(userNameTemperature.getUserTemperature());
        }

        return mySubscribeList;
    }

    //내가 정기 구독 중인 주식
    public List<MyStockDto> getMyStockList(int userNo) {
        List<StockSubscribe> myStockList = stockSubscribeRepository.findMyStockList(userNo);

        if(myStockList.isEmpty()) {
            throw new NullPointerException("내 주식 목록이 없습니다.");
        }

        List<MyStockDto> myStockDtoList = new ArrayList<>(myStockList.size());

        for(int i = 0; i < myStockList.size(); i++) {
            myStockDtoList.get(i).setStockName(myStockList.get(i).getStockName());
            myStockDtoList.get(i).setStockCount(myStockList.get(i).getStockCount());
            myStockDtoList.get(i).setStockDate(myStockList.get(i).getStockDate());
            myStockDtoList.get(i).setStockSubscribeCreate(myStockList.get(i).getStockSubscribeCreate());
            myStockDtoList.get(i).setStockTotalCount(myStockList.get(i).getStockTotalCount());
        }

        return myStockDtoList;
    }


}
