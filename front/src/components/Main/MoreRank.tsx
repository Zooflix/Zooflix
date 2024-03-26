import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useState,
} from "react";
import Character3d from "../Character/Character3d";
import styled from "styled-components";
import first from "../../assets/img/rank/first.svg";

interface Props {
  topFailUser: {
    userNo: number;
    userName: string;
    predictCount: number;
    successCount: number;
    failCount: number;
    userTemperature: number;
    userZbti: string;
    successStreak: number;
  };
  topStreakUser: {
    userNo: number;
    userName: string;
    predictCount: number;
    successCount: number;
    failCount: number;
    userTemperature: number;
    userZbti: string;
    successStreak: number;
  };
  topStock: {
    userNo: number;
    userName: string;
    predictCount: number;
    successCount: number;
    failCount: number;
    userTemperature: number;
    userZbti: string;
    successStreak: number;
  };
}

function MoreRank({ topFailUser, topStreakUser, topStock }: Props) {
  let zbti = new Map();
  zbti.set("Lion", "일단 다 사자");
  zbti.set("Monkey", "재간둥이 원숭이");
  zbti.set("Pig", "저금왕 돼지");
  zbti.set("Rabbit", "팔랑귀 토끼");

  return (
    <RankWrapper>
      {topStreakUser ? (
        <UserDiv>
          <Title>최다 연속 예측 성공</Title>
          <Character3d
            name={topStreakUser.userZbti}
            characterScale={0.35}
            canvasWidth={70}
            canvasHeight={85}
            action="turn"
          />
          <UserName>{topStreakUser.userName}</UserName>
          <PredictCount>
            연속 {topStreakUser.successStreak}회 예측 성공
          </PredictCount>
        </UserDiv>
      ) : (
        <div>Loading...</div>
      )}
      {topFailUser ? (
        <UserDiv>
          <Title>최다 예측 실패</Title>
          <Character3d
            name={topFailUser.userZbti}
            characterScale={0.35}
            canvasWidth={70}
            canvasHeight={80}
            action="turn"
          />
          <UserName>{topFailUser.userName}</UserName>
          <PredictCount>예측 {topFailUser.failCount}회 실패</PredictCount>
        </UserDiv>
      ) : (
        <div>Loading...</div>
      )}
      {topStock ? (
        <UserDiv>
          <Title>삼성전자 1위 예측자</Title>
          <Character3d
            name={topStock.userZbti}
            characterScale={0.4}
            canvasWidth={70}
            canvasHeight={80}
            action="turn"
          />
          <UserName>{topStock.userName}</UserName>
        </UserDiv>
      ) : (
        <div>Loading...</div>
      )}
    </RankWrapper>
  );
}

export default MoreRank;

const RankWrapper = styled.div`
  margin-left: 6vw;
  padding: 10px;
  display: flex;
  width: 62%;
`;

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

const UserDiv = styled.div`
  border: 1px solid rgba(109, 125, 147, 0.15);
  box-shadow: 4px 4px 20px -10px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  margin: 10px;
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
`;

const UserName = styled.div`
  font-weight: regular;
  font-size: 12px;
  color: gray;
`;

const PredictCount = styled.div`
  font-weight: bold;
  font-size: 12px;
  color: #2a4263;
`;