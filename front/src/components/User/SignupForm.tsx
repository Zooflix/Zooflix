import styled from "styled-components";
import UserBackground from "./UserBackground";
import UserInput from "./UserInput";
import SubmitBtn from "../Common/SubmitBtn";
import { useState } from "react";

function SignupForm() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
  };

  return (
    <Wrapper>
      <UserBackground />
      <Container>
        <h2>REGISTER</h2>
        <InputContainer>
          <UserInput type="text" placeholder="아이디를 입력하세요" />
          <UserInput type="text" placeholder="닉네임을 입력하세요" />
          <UserInput type="text" placeholder="비밀번호를 입력하세요" />
          <UserInput type="text" placeholder="비밀번호를 다시 입력하세요" />
          <CheckboxContainer>
            <input
              type="checkbox"
              id="isAppkey"
              name="isAppkey"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <Label htmlFor="isAppkey">APP KEY를 설정하겠습니다. (선택)</Label>
          </CheckboxContainer>
          {isChecked && (
            <>
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
            </>
          )}
        </InputContainer>
        <SubmitBtn text="회원가입 하기" />
        <h5>
          회원가입 시 주플릭스의 서비스 이용 약관과 개인정보 보호정책에 동의하게
          됩니다
        </h5>
      </Container>
    </Wrapper>
  );
}

export default SignupForm;
const Wrapper = styled.div``;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  z-index: 1;
  padding: 150px;
  h2 {
    color: #2a4263;
  }
  h5 {
    color: gray;
  }
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 20px;
`;
const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Label = styled.label`
  margin-left: 5px;
`;
