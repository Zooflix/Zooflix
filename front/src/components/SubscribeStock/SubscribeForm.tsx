import styled from "styled-components";
import { useState } from "react";

import SearchInput from "./SearchInput";
import PasswordInput from "./PasswordInput";
import SquareBtn from "../Common/SquareBtn";
import QuantityInput from "./QuantityInput";
import GetIssued from "./GetIssued";
import SubscribeDateInput from "./SubscribeDateInput";
import ImgBtn from "../Common/ImgBtn";

import SubscribeDetailModal from "./SubscribeDetailModal";

import Informationbtn from "../../assets/img/button/Informationbtn.svg";

function SubscribeForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Wrapper>
      <InputContainer>
        <SearchInput />
        <PasswordInput
          text="계좌번호"
          placeholder="한국투자증권 계좌번호를 입력하세요"
        />
        <SubscribeDateInput text="구독일" placeholder="구독일" />
        <PasswordInput
          text="APP 키"
          placeholder="한국투자증권 APP 키를 입력하세요"
        />
        <QuantityInput text="수량" />
        <ImgBtn src={Informationbtn} />
        <PasswordInput
          text="APP 시크릿 키"
          placeholder="한국투자증권 APP 시크릿 키를 입력하세요"
        />
      </InputContainer>
      <GetIssued />
      <ButtonContainer>
        <SquareBtn text="구독하기" onClick={openModal} />
        <SubscribeDetailModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
        />
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
  padding: 30px 30px 10px 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
