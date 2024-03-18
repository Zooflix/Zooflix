import styled from "styled-components";
import UserBackground from "../../components/User/UserBackground";
import UserInput from "../../components/User/UserInput";

function Signup() {
  return (
    <Wrapper>
      <UserBackground />
      <Container>
        {/* signupheader 넣기 */}

        <InputContainer>
          <UserInput type="text" placeholder="아이디를 입력하세요" />
          <UserInput type="text" placeholder="닉네임을 입력하세요" />
          <UserInput type="text" placeholder="비밀번호를 입력하세요" />
          <UserInput type="text" placeholder="비밀번호를 다시 입력하세요" />
          <UserInput
            type="text"
            placeholder="한국투자증권의 APP key를 입력하세요"
          />
          <UserInput
            type="text"
            placeholder="한국투자증권의 APP Secret key를 입력하세요"
          />
          <UserInput
            type="text"
            placeholder="한국투자증권의 계좌번호를 입력하세요(10자)"
          />
        </InputContainer>
      </Container>
    </Wrapper>
  );
}

export default Signup;

const Wrapper = styled.div``;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  z-index: 1;
  padding: 150px;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 20px;
`;
