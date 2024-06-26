import styled from "styled-components";
import { useEffect, useState } from "react";

// 컴포넌트
import SubscribeDetailModal from "./SubscribeDetailModal";
import SearchInput from "./SearchInput";
import PasswordInput from "./PasswordInput";
import SquareBtn from "../Common/SquareBtn";
import QuantityInput from "./QuantityInput";
import GetIssued from "./GetIssued";
import SubscribeDateInput from "./SubscribeDateInput";

import { getUserApi } from "../../apis/api/Subscribe";
import { useRecoilState } from "recoil";
import { userNoState } from "../../Store/UserState";

interface Props {
  setFetchData: (value: boolean) => void;
  fetchData: boolean;
}

function SubscribeForm({ setFetchData, fetchData }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accessToken, setAccessToken] = useState<boolean>(false);
  const [userNo, setUserNo] = useRecoilState(userNoState);

  const [stock, setStock] = useState<{
    stockName: string;
    stockCode: string;
  } | null>(null);
  const [subscribeDay, setSubscribeDay] = useState(0);
  const [stockCnt, setStockCnt] = useState(1);
  const [account, setAccount] = useState("");
  const [appkey, setAppkey] = useState("");
  const [secretkey, setSecretkey] = useState("");

  function openModal() {
    if (
      stock !== undefined &&
      subscribeDay > 0 &&
      subscribeDay < 31 &&
      stockCnt > 0
    ) {
      if (accessToken === false) {
        if (account.length !== 10) {
          alert("계좌번호는 10자리 입니다.");
        } else if (appkey.length < 2) {
          alert("App Key를 확인해주세요.");
        } else if (secretkey.length < 2) {
          alert("Secret Key를 확인해주세요.");
        } else {
          setIsModalOpen(true);
        }
      } else {
        setIsModalOpen(true);
      }
    } else {
      alert("입력을 확인해주세요.");
    }
  }
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
          <SearchInput onSearchChange={setStock} resetInput={fetchData} />
          <SubscribeDateInput
            text="구독일"
            placeholder="1 ~ 30"
            onDayChange={setSubscribeDay}
            resetInput={fetchData}
          />
          <QuantityInput
            text="수량"
            stockCntChange={setStockCnt}
            stockCnt={stockCnt}
            stockName={stock?.stockName}
            resetInput={fetchData}
          />
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
          stockName={stock?.stockName}
          stockCode={stock?.stockCode}
          stockSubscribeDay={subscribeDay}
          stockCount={stockCnt}
          userAccount={account}
          userAppKey={appkey}
          userSecretKey={secretkey}
          setFetchData={setFetchData}
          fetchData={fetchData}
        />
      </ButtonContainer>
    </Wrapper>
  );
}

export default SubscribeForm;

const Wrapper = styled.div`
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
