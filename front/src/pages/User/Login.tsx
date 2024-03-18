import styled from "styled-components";
import UserBackground from "../../components/User/UserBackground";
import UserInput from "../../components/User/UserInput";
import UserLoginHeader from "../../assets/img/user/UserLoginHeader.svg";

function Login() {
  return (
    <Wrapper>
      <UserBackground />
      <Container>
        <img src={UserLoginHeader} className="header" alt="userLogin" />
        <InputContainer>
          <UserInput type="text" placeholder="아이디를 입력하세요" />
          <UserInput type="password" placeholder="비밀번호를 입력하세요" />
        </InputContainer>
      </Container>
    </Wrapper>
  );
}

export default Login;

const Wrapper = styled.div``;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  z-index: 1;
  padding: 300px;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 20px;
`;
