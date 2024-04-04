import styled, { keyframes } from "styled-components";

import LoginHeader from "../../components/User/LoginHeader";

function UserBack() {
  return (
  <Wrapper>
    <LoginHeader backLink="/main"/>
  </Wrapper>
  );
}

export default UserBack;

const movement = keyframes`
  0% {
    background-position: 0px 0px;
  }
  100% {
    background-position: 560px 0px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  margin: 0;
  align-items: center;
  justify-content: center;
  background-color: #bfdfec;
  font-family: system-ui, calibri, serif;
  background-repeat: repeat-x;
  background-image: url("https://i.stack.imgur.com/b7z29.png");
  animation: ${movement} 10s linear infinite;
`;
