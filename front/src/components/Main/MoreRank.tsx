import Character3d from "../Character/Character3d";
import styled from "styled-components";

interface Props {
  topFailUser: any;
  topStreakUser: any;
  topStock: any;
}

function MoreRank({ topFailUser, topStreakUser, topStock }: Props) {
  let zbti = new Map();
  zbti.set("Lion", "일단 다 사자");
  zbti.set("Monkey", "재간둥이 원숭이");
  zbti.set("Pig", "저금왕 돼지");
  zbti.set("Rabbit", "팔랑귀 토끼");
  zbti.set("Bear", "검사 결과 없음");

  return (
    <RankWrapper>
      {topStreakUser ? (
        <UserDiv>
          <Title>최다 연속 예측 성공</Title>
          <Character3d
            name={topStreakUser.userZbti || "Bear"}
            characterScale={0.5}
            canvasWidth={70}
            canvasHeight={65}
            toBelow={27}
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
            name={topFailUser.userZbti || "Bear"}
            characterScale={0.5}
            canvasWidth={70}
            canvasHeight={65}
            toBelow={27}
            action="turn"
          />
          <UserName>{topFailUser.userName}</UserName>
          <PredictCount>예측 {topFailUser.failCount}회 실패</PredictCount>
        </UserDiv>
      ) : (
        <div>Loading...</div>
      )}
      {topStock && (
        <UserDiv>
          <Title>삼성전자 1위 예측자</Title>
          <Character3d
            name={topStock.userZbti || "Bear"}
            characterScale={0.5}
            canvasWidth={70}
            canvasHeight={65}
            toBelow={27}
            action="turn"
          />
          <UserName>{topStock.userName}</UserName>
          <PredictCount>예측 {topStock.cnt}회 성공</PredictCount>
        </UserDiv>
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
  height: 130px;
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
