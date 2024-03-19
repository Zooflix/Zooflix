import styled from "styled-components";
import UserBackground from "./UserBackground";
import UserInput from "./UserInput";
import SubmitBtn from "../Common/SubmitBtn";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <Wrapper>
      <UserBackground />
      <Container>
        <h2>REGISTER</h2>
        <InputContainer>
          <UserInput type="text" placeholder="아이디를 입력하세요" />
          <UserInput type="password" placeholder="비밀번호를 입력하세요" />
        </InputContainer>
        <SubmitBtn text="로그인 하기" />
        <GoToRegister onClick={handleSignupClick}>
          아직 회원이 아니신가요?
        </GoToRegister>
      </Container>
    </Wrapper>
  );
}

export default LoginForm;

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

const GoToRegister = styled.div`
  font-family: "Noto Sans KR", "Noto Sans", sans-serif;
`;
