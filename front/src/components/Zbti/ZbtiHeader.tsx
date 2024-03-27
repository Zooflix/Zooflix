import styled from "styled-components";

import BackBtn from "../Common/BackBtn";
import logo from "../../assets/img/Logo.svg";

function ZbtiHeader(props: { backLink: string}) {
  return (
    <div>
      <Header>
        <BackBtn link={props.backLink} />
        <img src={logo} alt="logo" className="logo" />
      </Header>
    </div>
  );
}

export default ZbtiHeader;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  margin: 25px 0 0 20px;
  .logo {
    width: 150px;
    margin: 0 20px;
  }
`;
