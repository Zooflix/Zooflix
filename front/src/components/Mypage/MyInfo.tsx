import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  myPageInfoState,
  myPagePredictListState,
} from "../../Store/MyPageState";

function MyInfo() {
  const [myPageInfo, setMyPageInfo] = useRecoilState(myPageInfoState);

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
        <h4>{myPageInfo.predictCount}</h4>
        <h4>{myPageInfo.successCount}</h4>
        <h4>{myPageInfo.predictionRate} %</h4>
        <h4>{myPageInfo.subscribeFromMe}</h4>
        <h4>{myPageInfo.subscribeToMe}</h4>
      </RightSideAnswer>
    </Wrapper>
  );
}

export default MyInfo;

const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 5px 70px;
`;

const LeftsideQuestion = styled.div``;

const RightSideAnswer = styled.div`
  h4 {
    color: #0099e8;
  }
`;
