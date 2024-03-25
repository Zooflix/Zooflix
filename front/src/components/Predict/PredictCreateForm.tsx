import styled from "styled-components";
import { useState, useEffect } from "react";
import { selectNowPrice } from "../../apis/api/Predict";

// 이미지
import Refreshbtn from "../../assets/img/button/Refreshbtn.svg";
import Informationbtn from "../../assets/img/button/Informationbtn.svg";

// 컴포넌트
import Search from "./Search";
import ImgBtn from "../../components/Common/ImgBtn";
import PredictInput from "./PredictInput";
import PredictReasonInput from "./PredictReasonInput";
import SquareBtn from "../../components/Common/SquareBtn";

// 스타일
const searchInputStyle = {
    width: "283px",
};

const refreshStyle = {
    marginLeft: "3px",
    marginRight: "7px",
    backgroundColor: "transparent",
    border: "none",
};

const informationStyle = {
    backgroundColor: "transparent",
    border: "none",
};

const buttonStyle = {
    backgroundColor: "white",
    color: "black",
    border: "none",
    boxShadow: "1px 2px 5px rgba(0, 0, 0, 0.2)",
};

function PredictCreateForm() {
    const [currentTime, setCurrentTime] = useState<string>("");
    const [minDate, setMinDate] = useState<string>("");
    const [maxDate, setMaxDate] = useState<string>("");
    const [stockName, setStockName] = useState("null");
    const [nowPrice, setNowPrice] = useState(0);

    const handleSearchChange = (value: React.SetStateAction<string>) => {
        setStockName(value);
    };


    const fetchData = async () => {
          const result = await selectNowPrice(stockName);
          setNowPrice(result);
  };

  useEffect(() => {
    fetchData();
    setTime();
  }, [stockName]);


  const refreshPrice = async () => {
    fetchData();
    setTime();
};


    // useEffect(() => {

    // }, []);

    const setTime = async () => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const nextMonth = new Date(today);
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      const minDateString = tomorrow.toISOString().split("T")[0];
      const maxDateString = nextMonth.toISOString().split("T")[0];

      setMinDate(minDateString);
      setMaxDate(maxDateString);

      const formattedCurrentTime = `${today.getFullYear()}년 ${
          today.getMonth() + 1
      }월 ${today.getDate()}일 ${today.getHours()}시 ${today.getMinutes()}분`;
      setCurrentTime(formattedCurrentTime);
    }

    return (
        <Wrapper>
            <InputContainer>
                <SearchContainer>
                    <label className="small-title">종목</label>
                    <Search
                        type="text"
                        placeholder="종목을 검색해주세요."
                        style={searchInputStyle}
                        onSearchChange={handleSearchChange}
                    />
                    <span>
                        <span className="highlighter">{currentTime}</span> 기준{" "}
                        <br />
                        {stockName}의 현재가는
                        <span className="highlighter"> {nowPrice}원</span>입니다.
                    </span>
                    <ImgBtn src={Refreshbtn} style={refreshStyle} onClick={refreshPrice}/>
                    <ImgBtn src={Informationbtn} style={informationStyle} />
                </SearchContainer>
                <PredictInput
                    text="예측날짜"
                    type="date"
                    min={minDate}
                    max={maxDate}
                    placeholder="날짜를 선택해주세요."
                />
                <PriceContainer>
                    <PredictInput
                        text="예측가"
                        type="number"
                        placeholder="예측 가격을 입력하세요."
                    />
                    <span>상승한다고 예측합니다.</span>
                </PriceContainer>
                <PredictReasonInput />
            </InputContainer>
            <BtnContainer>
                <SquareBtn text="예측하기" style={buttonStyle} />
            </BtnContainer>
        </Wrapper>
    );
}

export default PredictCreateForm;

const Wrapper = styled.div`
    width: 80vw;
    border: none;
    border-radius: 30px;
    background-color: white;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
`;

const InputContainer = styled.div``;

const SearchContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;

    .small-title {
        width: 70px;
        font-weight: bold;
        padding: 5px 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    span {
        font-size: 13px;
        color: gray;
    }

    .highlighter {
        font-weight: bold;
    }
`;

const PriceContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    span {
        font-size: 13px;
        color: gray;
    }
`;

const BtnContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 40px 0 20px 0;
`;