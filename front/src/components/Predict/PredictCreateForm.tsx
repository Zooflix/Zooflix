import styled from "styled-components";
import { useState, useEffect } from "react";

// 컴포넌트
import Search from "./Search";
import PredictInput from "./PredictInput";
import PredictReasonInput from "./PredictReasonInput";
import SquareBtn from "../../components/Common/SquareBtn";

// 스타일
const searchInputStyle = {
  width: "283px",
}


function PredictCreateForm() {
  const [minDate, setMinDate] = useState<string>("");
  const [maxDate, setMaxDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);


    const minDateString = tomorrow.toISOString().split("T")[0];
    const maxDateString = nextMonth.toISOString().split("T")[0];

    setMinDate(minDateString);
    setMaxDate(maxDateString);
  }, []);

  return (
    <Wrapper>
      <SearchContainer>
        <label className="small-title">종목</label>
          <Search type="text" placeholder="종목을 검색해주세요." style={searchInputStyle}/>
      </SearchContainer>
      <PredictInput text="예측날짜" type="date" min={minDate} max={maxDate} placeholder="날짜를 선택해주세요."/>
      <PredictInput text="예측가" type="number" placeholder="예측 가격을 입력하세요."/>
      <PredictReasonInput />
      <SquareBtn text="예측하기"/>
    </Wrapper>
  );
}

export default PredictCreateForm;

const Wrapper = styled.div`
  width: 60%;
  border: none;
  border-radius: 30px;
  background-color: white;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);

  SquareBtn {
    display: flex;
    align-items: center;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;

  .small-title {
    width: 70px;
    font-weight: bold;
    padding: 5px 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;
