import styled from "styled-components";

import SearchInput from "./SearchInput";
import PasswordInput from "./PasswordInput";
import SquareBtn from "../Common/SquareBtn";

function SubscribeForm() {
  return (
    <Wrapper>
      <InputContainer>
        <SearchInput />
        <PasswordInput
          text="계좌번호"
          placeholder="한국투자증권 계좌번호를 입력하세요"
        />
        {/* 구독일인풋 */}
        <PasswordInput
          text="APP 키"
          placeholder="한국투자증권 APP 키를 입력하세요"
        />
        {/* 수량인풋 */}
        <PasswordInput
          text="APP 시크릿 키"
          placeholder="한국투자증권 APP 시크릿 키를 입력하세요"
        />
      </InputContainer>
      <ButtonContainer>
        <SquareBtn text="구독하기" />
      </ButtonContainer>
    </Wrapper>
  );
}

export default SubscribeForm;

const Wrapper = styled.div`
  width: 1000px;
  border: none;
  border-radius: 30px;
  background-color: white;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  padding: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
