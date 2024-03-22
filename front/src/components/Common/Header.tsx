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
    width: 150px;
    margin: 30px 0;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
`;
