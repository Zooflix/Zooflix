import { useEffect, useState } from "react";
import styled from "styled-components";

function MyInfo() {

  const [myInfo, setMyInfo] = useState({});

  const myInfoExample =
    {
      userNo: 1,
      userName: '홍길동',
      userTemperature: 30,
      predictCount: 32,
      successCount: 28,
      predictionRate: 28/32 * 100,
      SubscribeFromMe: 1212,
      subscribeToMe: 1232,
    }


  useEffect(() => {
    
  }, []);

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
        <div>{myInfoExample.predictCount}</div>
        <div>{myInfoExample.successCount}</div>
        <div>{myInfoExample.predictionRate}</div>
        <div>{myInfoExample.SubscribeFromMe}</div>
        <div>{myInfoExample.subscribeToMe}</div>
      </RightSideAnswer>
    </Wrapper>
  )
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