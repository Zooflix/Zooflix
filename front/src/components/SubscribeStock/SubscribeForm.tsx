import styled from "styled-components";
import { useState } from "react";

// 이미지
import Informationbtn from "../../assets/img/button/Informationbtn.svg";

// 컴포넌트
import SubscribeDetailModal from "./SubscribeDetailModal";
import SearchInput from "./SearchInput";
import PasswordInput from "./PasswordInput";
import SquareBtn from "../Common/SquareBtn";
import QuantityInput from "./QuantityInput";
import GetIssued from "./GetIssued";
import SubscribeDateInput from "./SubscribeDateInput";
import ImgBtn from "../Common/ImgBtn";

// 스타일
const informationStyle = {
  backgroundColor: "transparent",
  border: "none",
};


function SubscribeForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");

  const setTime = async () => {
    const today = new Date();

    const formattedCurrentTime = `
      ${today.getFullYear()}년
      ${today.getMonth() + 1}월
      ${today.getDate()}일
      ${today.getHours()}시 ${today.getMinutes()}분
    `;
    setCurrentTime(formattedCurrentTime);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Wrapper>
      <InputContainer>
        <FirstContainer>
          <SearchInput />
          <SubscribeDateInput text="구독일" placeholder="구독일" />
          <QuantityInput text="수량" />
          {/* <span className="highlighter">예상가격 <br/> {currentTime}</span>
          <ImgBtn src={Informationbtn} style={informationStyle} information={{text: "✶ 현재 시장가X수량"}}/> */}
        </FirstContainer>
        <SecondContainer>
          <PasswordInput
            text="계좌번호"
            placeholder="한국투자증권 계좌번호를 입력하세요"
          />
          <PasswordInput
            text="APP 키"
            placeholder="한국투자증권 APP 키를 입력하세요"
          />
          <PasswordInput
            text="APP 시크릿 키"
            placeholder="한국투자증권 APP 시크릿 키를 입력하세요"
          />
        </SecondContainer>
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
  flex-direction: row;
  justify-content: space-between;

  span {
    font-size: 13px;
    color: gray;
  }

  .highlighter {
    font-weight: bold;
  }
`;

const FirstContainer = styled.div`

`;

const SecondContainer = styled.div`

`;
