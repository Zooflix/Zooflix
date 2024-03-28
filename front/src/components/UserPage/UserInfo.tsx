import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { userPageInfoState, userPagePredictListState } from "../../Store/UserPageState";

function UserInfo() {
    const [userPageInfo, setUserPageInfo] = useRecoilState(userPageInfoState);
    const [userPagePredictList, setUserPagePredictList] = useRecoilState(
        userPagePredictListState
    );

    let successCnt = 0; //성공 횟수
    
    userPagePredictList.forEach(item => {
        if (item.pdResult === "성공") {
            successCnt += 1;
        }
    });

    // 소수점 둘째 짜리까지 성공 비율 -> rate
    let rateOfPredict = Math.round(successCnt / userPagePredictList.length); 
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
                <div>{userPagePredictList.length}</div>
                <div>{successCnt}</div>
                <div>{rate + " %"}</div>
                <div>{userPageInfo.subscribeFromMe}</div>
                <div>{userPageInfo.subscribeToMe}</div>
            </RightSideAnswer>
        </Wrapper>
    );
}

export default UserInfo;

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
