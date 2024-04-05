import Character3d from "../Character/Character3d";
import styled from "styled-components";
import UserDetailModal from "../Predict/UserDetailModal";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { ModalUserNoState, ModalUserNameState } from "../../Store/PredictState";

interface Props {
  topFailUser: any;
  topStreakUser: any;
  topStock: any;
}

function MoreRank({ topFailUser, topStreakUser, topStock }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ModalUserNo, setModalUserNo] = useRecoilState(ModalUserNoState);
  const [ModalUserName, setModalUserName] = useRecoilState(ModalUserNameState);
  const openModal = (userName: string, userNo: number) => {
    setModalUserName(userName);
    setModalUserNo(userNo);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <RankWrapper>
      {topStreakUser && (
        <UserDiv
          onClick={() => {
            openModal(topStreakUser.userName, topStreakUser.userNo);
          }}
        >
          <Title>최다 연속 예측 성공</Title>
          <Character3d
            name={topStreakUser.userZbti || "Bear"}
            characterScale={0.47}
            canvasWidth={70}
            canvasHeight={60}
            toBelow={26}
            action="turn"
          />
          <UserName>{topStreakUser.userName}</UserName>
          <PredictCount>
            연속 {topStreakUser.successStreak}회 예측 성공
          </PredictCount>
        </UserDiv>
      )}
      {topFailUser && (
        <UserDiv
          onClick={() => {
            openModal(topFailUser.userName, topFailUser.userNo);
          }}
        >
          <Title>최다 예측 실패</Title>
          <Character3d
            name={topFailUser.userZbti || "Bear"}
            characterScale={0.47}
            canvasWidth={70}
            canvasHeight={60}
            toBelow={26}
            action="turn"
          />
          <UserName>{topFailUser.userName}</UserName>
          <PredictCount>예측 {topFailUser.failCount}회 실패</PredictCount>
        </UserDiv>
      )}
      {topStock && (
        <UserDiv
          onClick={() => {
            openModal(topStock.userName, topStock.userNo);
          }}
        >
          <Title>삼성전자 1위 예측자</Title>
          <Character3d
            name={topStock.userZbti || "Bear"}
            characterScale={0.47}
            canvasWidth={70}
            canvasHeight={60}
            toBelow={26}
            action="turn"
          />
          <UserName>{topStock.userName}</UserName>
          <PredictCount>예측 {topStock.cnt}회 성공</PredictCount>
        </UserDiv>
      )}
      {topStreakUser && (
        <>
          <UserDetailModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            userName={ModalUserName}
            userNo={ModalUserNo}
          />
        </>
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
