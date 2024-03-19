import styled from "styled-components";

import BackBtn from "../Common/BackBtn";
import logo from "../../assets/img/Logo.svg";

function ZbtiHeader() {
  return (
    <div>
      <Header>
        <BackBtn link="/zbti" />
        <img src={logo} alt="logo" className="logo" />
      </Header>
    </div>
  );
}

export default ZbtiHeader;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0 0 20px;
  .logo {
    width: 100px;
    margin: 0 20px;
  }
`;
