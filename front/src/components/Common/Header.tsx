import styled from "styled-components";

import Logo from "../../assets/img/Logo.svg";

function Header() {
  return (
    <ImgContainer>
      <img src={Logo} alt="logo" />
    </ImgContainer>
  );
}

export default Header;

const ImgContainer = styled.div`
  img {
    width: 130px;
    margin-top: 15px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;
