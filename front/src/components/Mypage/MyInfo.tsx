import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { myPageInfoState, myPagePredictListState } from "../../Store/MyPageState";

function MyInfo() {
    const [myPageInfo, setMyPageInfo] = useRecoilState(myPageInfoState);
    const [myPagePredictList, setMyPagePredictList] = useRecoilState(
        myPagePredictListState
    );

    let successCnt = 0; //성공 횟수
    
    myPagePredictList.forEach(item => {
        if (item.pdResult === "성공") {
            successCnt += 1;
        }
    });

    // 소수점 둘째 짜리까지 성공 비율 -> rate
    let rateOfPredict = Math.round(successCnt / myPagePredictList.length); 
    let rate = Math.round(rateOfPredict * 100) / 100;

    return (
        <Wrapper>
            <LeftsideQuestion>
                <div>총 예측 횟수</div>
                <div>예측 성공 횟수</div>
                <div>예측률</div>
                <div>구독</div>
                <div>구독자</div>
            </LeftsideQuestion>
            <RightSideAnswer>
                <div>{myPagePredictList.length}</div>
                <div>{successCnt}</div>
                <div>{rate}</div>
                <div>{myPageInfo.subscribeFromMe}</div>
                <div>{myPageInfo.subscribeToMe}</div>
            </RightSideAnswer>
        </Wrapper>
    );
}

export default MyInfo;

const Wrapper = styled.div`
    margin: 0 auto;
    display: flex;
`;

const LeftsideQuestion = styled.div`
  float: left;
  width: 80%;
  margin: 30px 70px;
  text-align: left;
`;

const RightSideAnswer = styled.div`
  float: right;
  width: 20%;
  margin: 30px 70px;
  text-align: right;
`;
