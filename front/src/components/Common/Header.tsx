import styled, { keyframes } from "styled-components";

import Logo from "../../assets/img/Logo.svg";
import alarmbtn from "../../assets/img/button/Alarmbtn.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AlarmModal from "../Alarm/AlarmModal";
import { logoutUser } from "../../apis/api/User";
import { loginCheck } from "../User/IsLoginCheck";
import { getJwtUserName } from "../../apis/utils/jwt";
import { useRecoilState } from "recoil";
import { userIdState, isLoginState } from "../../Store/UserState";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(loginCheck());
  const [userId, setUserId] = useRecoilState(userIdState);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    logoutUser(); // 로그아웃 요청
    setIsLogin(false); // 로그인 상태 업데이트
    setUserId(undefined);
    localStorage.removeItem("userIdState");
    navigate("/main");
  };

  const [access, setAccess] = useState(localStorage.getItem("access") || "");

  useEffect(() => {
    const storedAccess = localStorage.getItem("access");
    setAccess(storedAccess || "");
  }, []);

  return (
    <Container>
      <ImgContainer>
        <img src={Logo} alt="logo" className="logo" />
        <LoginContainer>
          {isLogin ? (
            <LoginWrapper>
              <Text>{getJwtUserName()}님 반가워요!</Text>
              <Button onClick={handleLogout}>로그아웃</Button>
              <CircleContainer>
                <div>
                  <Circle onClick={openModal}>
                    <img src={alarmbtn} alt="alarmbtn" />
                  </Circle>
                  <AlarmModal
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                  />
                </div>
              </CircleContainer>
            </LoginWrapper>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Login>로그인</Login>
            </Link>
          )}
        </LoginContainer>
      </ImgContainer>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  margin-top: 20px;
  margin-bottom: 15px;
`;

const CircleContainer = styled.div`
  cursor: pointer;
  &:hover {
    scale: 1.1;
  }
`;

const CircleMotion = keyframes`
`;

const Circle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #2a4263;
  position: relative;
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

const Button = styled.div`
  background-color: #2a4263;
  padding: 10px 20px;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    scale: 1.1;
  }
`;

const Text = styled.div`
  margin-top: 5px;
`;

const Login = styled.div`
  background-color: #2a4263;
  padding: 10px 20px;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    scale: 1.1;
  }
  margin-right: 40px;
`;

const LoginWrapper = styled.div`
  display: flex;
  div {
    margin-right: 10px;
  }
`;
const ImgContainer = styled.div`
  position: relative;
  width: 100vw;
  display: flex;
  justify-content: center;
  .logo {
    width: 150px;
  }
`;

const LoginContainer = styled.div`
  position: absolute;
  display: flex;
  width: 100vw;
  justify-content: flex-end;
`;
