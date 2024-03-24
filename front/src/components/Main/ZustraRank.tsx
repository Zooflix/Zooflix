import React, { useEffect, useState } from "react";
import Character3d from "../Character/Character3d";
import styled from "styled-components";
import first from "../../assets/img/rank/first.svg";
import second from "../../assets/img/rank/second.svg";
import third from "../../assets/img/rank/third.svg";

function ZustraRank() {
  const rankArr = [first, second, third];
  const [mainData, setMainData] = useState({
    zustraRank: [
      {
        userNo: 1,
        userName: "수민",
        predictCount: 2,
        successCount: 1,
        failCount: 1,
        userTemperature: 1,
        userZbti: "일단 다 사자",
        successStreak: 1,
      },
      {
        userNo: 1,
        userName: "혜진",
        predictCount: 3,
        successCount: 1,
        failCount: 2,
        userTemperature: 1,
        userZbti: "재간둥이 원숭이",
        successStreak: 1,
      },
      {
        userNo: 1,
        userName: "성주",
        predictCount: 10,
        successCount: 3,
        failCount: 7,
        userTemperature: 1,
        userZbti: "팔랑귀 토끼",
        successStreak: 1,
      },
    ],
    topFailUser: {
      userNo: 1,
      userName: "ssafy",
      predictCount: 1,
      successCount: 1,
      failCount: 1,
      userTemperature: 1,
      userZbti: "ibnf",
      successStreak: 1,
    },
    topStreakUser: {
      userNo: 1,
      userName: "ssafy",
      predictCount: 1,
      successCount: 1,
      failCount: 1,
      userTemperature: 1,
      userZbti: "ibnf",
      successStreak: 1,
    },
    topStock: {
      userNo: 1,
      userName: "ssafy",
      predictCount: 1,
      successCount: 1,
      failCount: 1,
      userTemperature: 1,
      userZbti: "ibnf",
      successStreak: 1,
    },
    todayStock: [
      {
        userNo: 1,
        userName: "ssafy",
        predictCount: 1,
        successCount: 1,
        failCount: 1,
        userTemperature: 1,
        userZbti: "ibnf",
        successStreak: 1,
      },
      {
        userNo: 1,
        userName: "ssafy",
        predictCount: 1,
        successCount: 1,
        failCount: 1,
        userTemperature: 1,
        userZbti: "ibnf",
        successStreak: 1,
      },
      {
        userNo: 1,
        userName: "ssafy",
        predictCount: 1,
        successCount: 1,
        failCount: 1,
        userTemperature: 1,
        userZbti: "ibnf",
        successStreak: 1,
      },
    ],
  });

  useEffect(() => {});

  return (
    <RankWrapper>
      <RankHeader>주스트라다무스 랭킹</RankHeader>
      {mainData.zustraRank ? (
        <RankDiv>
          {mainData.zustraRank.map((item, index) => {
            return (
              <UserDiv key={index}>
                <img src={rankArr[index]} height="60px" />
                <Character3d
                  name="Bear"
                  characterScale={0.5}
                  canvasWidth={50}
                  canvasHeight={60}
                  action="turn"
                />
                <div>
                  <div>
                    <Name>{item.userName}</Name>
                    <SmallText>
                      {Math.round(
                        (item.successCount / item.predictCount) * 100
                      )}
                      % 예측 성공률
                    </SmallText>
                  </div>
                  <Zbti>{item.userZbti}</Zbti>
                </div>
              </UserDiv>
            );
          })}
        </RankDiv>
      ) : (
        <div>Loading...</div>
      )}
    </RankWrapper>
  );
}

export default ZustraRank;

const RankWrapper = styled.div`
  margin-left: 6vw;
  padding: 10px;
`;

const RankHeader = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
`;

const RankDiv = styled.div`
  background: #ffffff;
  border: 1px solid rgba(109, 125, 147, 0.15);
  box-shadow: 4px 4px 20px -10px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  width: 65%;
  padding: 10px;
`;

const UserDiv = styled.div`
  border: 1px solid rgba(109, 125, 147, 0.15);
  box-shadow: 4px 4px 20px -10px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  margin: 10px;
  padding: 20px 15px;
  display: flex;
  div {
    margin-left: 10px;
  }
`;

const Name = styled.span`
  margin: 2px;
  font-weight: bold;
`;

const SmallText = styled.span`
  margin: 2px;
  font-weight: semi-bold;
  font-size: 10px;
  color: gray;
`;

const Zbti = styled.div`
  margin: 2px;
  font-weight: bold;
  font-size: 12px;
  color: #2d2d2d;
  margin-top: 5px;
`;
