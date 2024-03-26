import styled, { keyframes } from "styled-components";

import Logo from "../../assets/img/Logo.svg";
import alarmbtn from "../../assets/img/button/Alarmbtn.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import AlarmModal from "../Alarm/AlarmModal";
import { logoutUser } from "../../apis/api/User";
import { loginCheck } from "../User/IsLoginCheck";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Container>
      <ImgContainer>
        <img src={Logo} alt="logo" className="logo" />
      </ImgContainer>
      <LoginContainer>
        {
          loginCheck()? (
            <div onClick={ logoutUser } style={{ textDecoration: "none", color: "black" }}>
              <div>로그아웃</div>
            </div>
          ) : (
            <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
              <div>로그인</div>
            </Link>
          )
        }
        
        {/* 누르면 모달 */}
        <CircleContainer>
          <Circle onClick={openModal}>
            <img src={alarmbtn} alt="alarmbtn" />
          </Circle>
          <AlarmModal isModalOpen={isModalOpen} closeModal={closeModal} />
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
    margin: 0 500px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CircleContainer = styled.div`
  margin-top: 50px;
  margin-left: 10px;
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
