import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
    myPageInfoState,
    myPagePredictListState,
} from "../../Store/MyPageState";
import { useState } from "react";
import { userPageInfoState } from "../../Store/UserPageState";

function UserInfo() {
    const [userPageInfo, setUserPageInfo] = useRecoilState(userPageInfoState);
    const [userPagePredictList, setUserPagePredictList] = useRecoilState(
        myPagePredictListState
    );
    
    console.log(userPageInfo.userNo);
    console.log(userPagePredictList.length);

    let successCnt = 0; //성공 횟수
    let successRate = 0; //성공 확률

    userPagePredictList.forEach((item) => {
        if (item.pdResult === "성공") {
            successCnt += 1;
        }
    });

    if(successCnt > 0) {
      successRate = Math.round((successCnt / userPagePredictList.length) * 100) / 100;
    } else {
      successRate = 0;
    }

    return (
        <Wrapper>
            <LeftsideQuestion>
                <h4>총 예측 횟수</h4>
                <h4>예측 성공 횟수</h4>
                <h4>예측률</h4>
                <h4>구독</h4>
                <h4>구독자</h4>
            </LeftsideQuestion>
            <RightSideAnswer>
                <h4>{userPagePredictList.length}</h4>
                <h4>{successCnt}</h4>
                <h4>{successRate} %</h4>
                <h4>{userPageInfo.subscribeFromMe}</h4>
                <h4>{userPageInfo.subscribeToMe}</h4>
            </RightSideAnswer>
        </Wrapper>
    );
}

export default UserInfo;

const Wrapper = styled.div`
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding: 5px 70px;
`;

const LeftsideQuestion = styled.div``;

const RightSideAnswer = styled.div``;
