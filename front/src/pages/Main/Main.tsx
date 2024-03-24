import styled from "styled-components";
import FlowBar from "../../components/Main/FlowBar";
import ZustraRank from "../../components/Main/ZustraRank";
import { useState } from "react";
import MoreRank from "../../components/Main/MoreRank";

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
    topStock: {
      userNo: 1,
      userName: "혜진",
      predictCount: 3,
      successCount: 1,
      failCount: 2,
      userTemperature: 68,
      userZbti: "Monkey",
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

  return (
    <MainWrapper>
      <FlowBar />
      <ZustraRank rankData={mainData.zustraRank} />
      <MoreRank
        topFailUser={mainData.topFailUser}
        topStreakUser={mainData.topStreakUser}
        topStock={mainData.topStock}
      />
    </MainWrapper>
  );
}

export default Main;

const MainWrapper = styled.div`
  padding-left: 25px;
`;
