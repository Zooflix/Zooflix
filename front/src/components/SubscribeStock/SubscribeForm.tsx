import styled from "styled-components";
import { useEffect, useState } from "react";

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

import { getUserApi } from "../../apis/api/Subscribe";
import { access } from "fs";
import { useRecoilState } from "recoil";
import { userNoState } from "../../Store/UserState";

// 스타일
const informationStyle = {
  backgroundColor: "transparent",
  border: "none",
};

function SubscribeForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accessToken, setAccessToken] = useState<boolean>(false);
  const [userNo, setUserNo] = useRecoilState(userNoState);

  const [stockName, setStockName] = useState("");
  const [subscribeDay, setSubscribeDay] = useState(1);
  const [stockCnt, setStockCnt] = useState(1);
  const [account, setAccount] = useState("");
  const [appkey, setAppkey] = useState("");
  const [secretkey, setSecretkey] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    console.log("main");
    handleList();
    console.log(accessToken);
  }, []);

  const handleList = async () => {
    console.log(userNo);
    const IsAccess = await getUserApi();
    console.log("rankinglist" + IsAccess);
    setAccessToken(IsAccess);
  };

  return (
    <Wrapper>
      <InputContainer>
        <FirstContainer>
          <SearchInput onSearchChange={setStockName} />
          <SubscribeDateInput
            text="구독일"
            placeholder="구독일"
            onDayChange={setSubscribeDay}
          />
          <QuantityInput text="수량" stockCntChange={setStockCnt} />
        </FirstContainer>
        {!accessToken ? (
          <SecondContainer>
            <PasswordInput
              text="계좌번호"
              placeholder="한국투자증권 계좌번호를 입력하세요"
              onInputChange={setAccount}
            />
            <PasswordInput
              text="APP 키"
              placeholder="한국투자증권 APP 키를 입력하세요"
              onInputChange={setAppkey}
            />
            <PasswordInput
              text="APP 시크릿 키"
              placeholder="한국투자증권 APP 시크릿 키를 입력하세요"
              onInputChange={setSecretkey}
            />
          </SecondContainer>
        ) : (
          <SecondContainer>
            <PasswordInput
              text="계좌번호"
              placeholder="저장된 계좌번호가 있습니다."
              onInputChange={setAccount}
              disabled
            />
            <PasswordInput
              text="APP 키"
              placeholder="저장된 APP 키가 있습니다."
              onInputChange={setAppkey}
              disabled
            />
            <PasswordInput
              text="APP 시크릿 키"
              placeholder="저장된 APP 시크릿 키가 있습니다."
              onInputChange={setSecretkey}
              disabled
            />
          </SecondContainer>
        )}
      </InputContainer>
      {!accessToken && <GetIssued />}
      <ButtonContainer>
        <SquareBtn text="구독하기" onClick={openModal} />
        <SubscribeDetailModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          stockName={stockName}
          stockSubscribeDay={subscribeDay}
          stockCount={stockCnt}
          userAccount={account}
          userAppKey={appkey}
          userSecretKey={secretkey}
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

const FirstContainer = styled.div``;

const SecondContainer = styled.div``;
