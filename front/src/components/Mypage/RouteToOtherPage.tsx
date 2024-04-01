import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { myPageInfoState } from "../../Store/MyPageState";
import MsgModal from "./MsgModal";

function RouteToOtherPage() {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(myPageInfoState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleClickToPortfolio() {
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
      <Button onClick={() => handleClickToUpdateUser()}>수정</Button>
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
  padding: 50px 0;
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
`;
