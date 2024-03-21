import styled from "styled-components";

import Logo from "../../assets/img/Logo.svg";

function Header() {
  return (
    <div>
      <ImgContainer>
        <img src={Logo} alt="logo" />
      </ImgContainer>
    </div>
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
`;
