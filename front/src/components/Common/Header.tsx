import styled, { keyframes } from "styled-components";

import Logo from "../../assets/img/Logo.svg";
import alarmbtn from "../../assets/img/button/Alarmbtn.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AlarmModal from "../Alarm/AlarmModal";
import { logoutUser } from "../../apis/api/User";
import { loginCheck } from "../User/IsLoginCheck";
import { getJwtUserId } from "../../apis/utils/jwt";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(loginCheck());

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    logoutUser(); // 로그아웃 요청
    setIsLogin(false); // 로그인 상태 업데이트
  };

  const [access, setAccess] = useState(localStorage.getItem("access") || "");

  useEffect(() => {
    const storedAccess = localStorage.getItem("access");
    setAccess(storedAccess || "");
  }, []);

  return (
    <Container>
      <Space></Space>
      <ImgContainer>
        <img src={Logo} alt="logo" className="logo" />
      </ImgContainer>
      <LoginContainer>
        {isLogin ? (
          <LoginWrapper
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <div>{getJwtUserId()}님 반가워요!</div>
            <Button onClick={handleLogout}>로그아웃</Button>
          </LoginWrapper>
        ) : (
          <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
            <div>로그인</div>
          </Link>
        )}

        <CircleContainer>
          {isLogin ? (
            <div>
              <Circle onClick={openModal}>
                <img src={alarmbtn} alt="alarmbtn" />
              </Circle>
              <AlarmModal isModalOpen={isModalOpen} closeModal={closeModal} />
            </div>
          ) : null}
        </CircleContainer>
      </LoginContainer>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  margin-left: 6vw;
  .logo {
    width: 150px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
`;

const ImgContainer = styled.div`
  // display: flex;
  // justify-content: center;
`;

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CircleContainer = styled.div`
  margin-top: 50px;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;
`;

const CircleMotion = keyframes`
`;

const Circle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #2a4263;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &:hover {
    // animation: ${CircleMotion} 1s infinite alternate;
  }
`;

const Button = styled.button`
  border: none;
  background-color: #2a4263;
  padding: 10px;
  color: white;
  border-radius: 15px;
  margin-left: 10px;
  cursor: pointer;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Space = styled.div`
  width: 11vw;
`;
