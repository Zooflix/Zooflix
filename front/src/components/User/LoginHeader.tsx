import styled from "styled-components";

import BackBtn from "../Common/BackBtn";

function LoginHeader(props: { backLink: string}) {
  return (
    <div>
      <Header>
        <BackBtn link={props.backLink} />
      </Header>
    </div>
  );
}

export default LoginHeader;

const Header = styled.div`
  background-color: rgba( 255, 255, 255, 0 );
  position: absolute;
  top: 25px;
  left: 20px;
`;
