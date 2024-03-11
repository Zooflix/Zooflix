package com.zooflix.be_zooflix.domain.myPage.service;

import com.zooflix.be_zooflix.domain.myPage.dto.response.MyInfoDto;
import com.zooflix.be_zooflix.domain.myPage.dto.response.MyPredictionDto;
import com.zooflix.be_zooflix.domain.myPage.repository.MyPageRepository;
import com.zooflix.be_zooflix.domain.predict.entity.Predict;
import com.zooflix.be_zooflix.domain.predict.repository.PredictRepository;
import com.zooflix.be_zooflix.domain.stockSubscribe.repository.StockSubscribeRepository;
import com.zooflix.be_zooflix.domain.user.entity.User;
import com.zooflix.be_zooflix.domain.user.repository.UserRepository;
import com.zooflix.be_zooflix.domain.userSubscribe.entity.UserSubscribe;
import com.zooflix.be_zooflix.domain.userSubscribe.repository.UserSubscribeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class MyPageService {

    private final PredictRepository predictRepository;
    private final UserRepository userRepository;
    private final UserSubscribeRepository userSubscribeRepository;

    public MyPageService(PredictRepository predictRepository, UserRepository userRepository, UserSubscribeRepository userSubscribeRepository) {
        this.predictRepository = predictRepository;
        this.userRepository = userRepository;
        this.userSubscribeRepository = userSubscribeRepository;
    }
    public MyInfoDto getUserInfo(int userNo) {
        User user = userRepository.findMyInfo(userNo);
        if( user == null) {
            throw new NullPointerException("존재하지 않은 유저입니다.");
        }

        MyInfoDto myInfo = new MyInfoDto();

        myInfo.setUserName(user.getUserName());
        myInfo.setUserTemperature(user.getUserTemperature());
        myInfo.setPredictCount(user.getPredictCount());
        myInfo.setPredictionRate(Math.round((double)user.getSuccessCount()/user.getPredictCount() * 100));
        myInfo.setSuccessCount(user.getSuccessCount());

        return myInfo;
    }
    //my page 에서 보여줄 내 예측 글 정보담기
    public List<MyPredictionDto> getMyPredictByNo(int userNo) {
        List<Predict> myPredict= predictRepository.findMyPredict(userNo);
        if(myPredict.isEmpty()){//내 예측이 존재하지 않으면
            throw new NullPointerException("예측이 존재하지 않습니다.");
        }

        List<MyPredictionDto> myPredictList = new ArrayList<>();

        for(int i = 0; i < myPredict.size(); i++) {
            myPredictList.get(i).setStockName(myPredict.get(i).getStockName());
            myPredictList.get(i).setPdValue(myPredict.get(i).getPdValue());
            myPredictList.get(i).setPdUpDown(myPredict.get(i).isPdUpDown());
            myPredictList.get(i).setPdDate(myPredict.get(i).getPdDate());
            myPredictList.get(i).setPdResult(myPredict.get(i).getPdResult());
            myPredictList.get(i).setPdContent(myPredict.get(i).getPdContent());
        }

        return myPredictList;
    }
}
