import styled from "styled-components";
import FlowBar from "../../components/Main/FlowBar";
import ZustraRank from "../../components/Main/ZustraRank";
import { useState } from "react";
import MoreRank from "../../components/Main/MoreRank";
import StockRank from "../../components/Main/StockRank";
import Character3d from "../../components/Character/Character3d";

function Main() {
  const [mainData, setMainData] = useState({
    zustraRank: [
      {
        userNo: 1,
        userName: "수민",
        predictCount: 2,
        successCount: 1,
        failCount: 1,
        userTemperature: 78,
        userZbti: "Lion",
        successStreak: 1,
      },
      {
        userNo: 1,
        userName: "혜진",
        predictCount: 3,
        successCount: 1,
        failCount: 2,
        userTemperature: 68,
        userZbti: "Monkey",
        successStreak: 1,
      },
      {
        userNo: 1,
        userName: "성주",
        predictCount: 10,
        successCount: 3,
        failCount: 7,
        userTemperature: 62,
        userZbti: "Rabbit",
        successStreak: 1,
      },
    ],
    topFailUser: {
      userNo: 1,
      userName: "성주",
      predictCount: 10,
      successCount: 3,
      failCount: 7,
      userTemperature: 62,
      userZbti: "Rabbit",
      successStreak: 1,
    },
    topStreakUser: {
      userNo: 1,
      userName: "수민",
      predictCount: 2,
      successCount: 1,
      failCount: 1,
      userTemperature: 78,
      userZbti: "Lion",
      successStreak: 1,
    },
    topStockUser: {
      userNo: 1,
      userName: "혜진",
      predictCount: 3,
      successCount: 1,
      failCount: 2,
      userTemperature: 68,
      userZbti: "Monkey",
      successStreak: 1,
    },
    stockRank: [
      {
        stockCode: 12345,
        StockName: "삼성전자",
        subscriberCnt: 98,
      },
      {
        stockCode: 23456,
        StockName: "SK하이닉스",
        subscriberCnt: 88,
      },
      {
        stockCode: 98765,
        StockName: "LG에너지솔루션",
        subscriberCnt: 56,
      },
    ],
  });

  return (
    <MainWrapper>
      <FlowBar />
      <Rank>
        <ZustraRank rankData={mainData.zustraRank} />
        <StockRank stockRank={mainData.stockRank} />
      </Rank>
      <BelowDiv>
        <MoreRank
          topFailUser={mainData.topFailUser}
          topStreakUser={mainData.topStreakUser}
          topStock={mainData.topStockUser}
        />
        <SubscribeDiv>
          <Bubble>주식 구독하러가기</Bubble>
          <Character3d
            name="Bear"
            characterScale={0.55}
            canvasHeight={220}
            canvasWidth={160}
          />
        </SubscribeDiv>
      </BelowDiv>
    </MainWrapper>
  );
}

export default Main;

const MainWrapper = styled.div`
  padding-left: 25px;
  display: flex;
  flex-direction: column;
`;

const Rank = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const BelowDiv = styled.div`
  display: flex;
`;

const Bubble = styled.div`
  position: relative;
  background: #092d5d;
  border-radius: 30px;
  color: white;
  padding: 20px 30px;
  height: 100px;
  font-weight: bold;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  cursor: pointer;
  margin: 30px 30px 10px 10px;

  &:after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 30px solid transparent;
    border-left-color: #092d5d;
    border-right: 0;
    border-top: 0;
    margin-top: -12px;
    margin-right: -20px;
  }
`;

const SubscribeDiv = styled.div`
  display: flex;
`;
