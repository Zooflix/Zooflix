import styled from "styled-components";

import Logo from "../../assets/img/Logo.svg";

function Header() {
  return (
    <div>
      <ImgContainer>
        <img src={Logo} alt="logo" />
      </ImgContainer>
      <AlarmContainer></AlarmContainer>
    </div>
  );
}

export default Header;

const ImgContainer = styled.div`
  img {
    width: 100px;
    margin-top: 10px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AlarmContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
