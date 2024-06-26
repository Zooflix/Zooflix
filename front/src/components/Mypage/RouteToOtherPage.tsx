import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { myPageInfoState } from "../../Store/MyPageState";
import MsgModal from "./MsgModal";
import { userZbti } from "../../Store/UserState";

function RouteToOtherPage() {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(myPageInfoState);
  const [userSbti, setUserZbti] = useRecoilState(userZbti);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  function handleClickToPortfolio() {
    setUserZbti(userInfo.userZbti);
    if (userInfo.userZbti === "Bear") {
      setIsModalOpen(true);
    } else {
      navigate("/result");
    }
  }

  function handleClickToUpdateUser() {
    navigate("/my-page/update");
  }

  return (
    <Container>
      <Button onClick={() => handleClickToPortfolio()}>
        내 포트폴리오 확인하기
      </Button>
      <Button onClick={() => handleClickToUpdateUser()}>정보 수정</Button>
      <MsgModal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
    </Container>
  );
}

export default RouteToOtherPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding-bottom: 20px;
`;

const Button = styled.button`
  font-size: 15px;
  font-weight: bold;
  padding: 10px;
  border: none;
  border-radius: 15px;
  background-color: #e7f1f5;
  color: #97adca;
  margin: 0 10px;
  &:hover {
    scale: 1.1;
  }
  cursor: pointer;
`;
