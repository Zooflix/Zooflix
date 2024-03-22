import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { myPageInfoState } from "../../Store/MyPageState";

function MyInfo() {
    const [myPageInfo, setMyPageInfo] = useRecoilState(myPageInfoState);

    useEffect(() => {}, []);

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
                <div>{myPageInfo.predictCount}</div>
                <div>{myPageInfo.successCount}</div>
                <div>{myPageInfo.predictionRate}</div>
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
  float: left,
  width: 50%;
  margin: 30px 70px;
  text-align: left;
`;

const RightSideAnswer = styled.div`
  float: right,
  width: 50%;
  margin: 30px 70px;
  text-align: right;
`;
