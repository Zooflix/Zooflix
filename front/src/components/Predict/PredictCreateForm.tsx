import styled from "styled-components";
import { useState, useEffect } from "react";
import { selectNowPrice } from "../../apis/api/Predict";
import { checkPredict } from "../../apis/api/Predict";
import { insertPredict } from "../../apis/api/Predict";
import { useNavigate } from "react-router-dom";
import { getJwtUserNo } from "../../apis/utils/jwt";

// 이미지
import Refreshbtn from "../../assets/img/button/Refreshbtn.svg";
import Informationbtn from "../../assets/img/button/Informationbtn.svg";

// 컴포넌트
import Search from "./Search";
import ImgBtn from "../../components/Common/ImgBtn";
import PredictInput from "./PredictInput";
import PredictReasonInput from "./PredictReasonInput";
import SquareBtn from "../../components/Common/SquareBtn";

import { Alert, AlertColor, Snackbar } from "@mui/material";

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
  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState<string>("");
  const [minDate, setMinDate] = useState<string>("");
  const [maxDate, setMaxDate] = useState<string>("");
  const [stockName, setStockName] = useState("");
  const [nowPrice, setNowPrice] = useState(0);
  const [priceOk, setPriceOk] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [upDown, setUpDown] = useState<string>("");
  const [open, setOpen] = useState(false);

  const [alertOption, setAlertOption] = useState<{
    severity: AlertColor;
    value: String;
  }>({ severity: "error", value: "" });

  const [predictDate, setPredictDate] = useState<string>("");
  const handleDateChange = (value: React.SetStateAction<string>) => {
    setPredictDate(value);
  };

  const [predictPrice, setPredictPrice] = useState(0);
  const handlePriceChange = (value: React.SetStateAction<number>) => {
    setPredictPrice(value);
  };
  const [predictReason, setPredictReason] = useState<string>("");
  const handleReasonChange = (value: React.SetStateAction<string>) => {
    setPredictReason(value);
  };

  const handlePredict = async () => {
    if (stockName === "") {
      setOpen(true);
      setAlertOption({
        severity: "error",
        value: "종목명을 선택해 주세요.",
      });
      return;
    }
    if (predictDate === "") {
      setOpen(true);
      setAlertOption({
        severity: "error",
        value: "예측 날짜를 선택해 주세요.",
      });
      return;
    }
    const date = new Date(predictDate);
    if (date.getDay() === 0 || date.getDay() === 6) {
      setPriceOk(false);
      setOpen(true);
      setAlertOption({
        severity: "error",
        value: "주말 및 공휴일은 예측 불가합니다. 다시 선택해주세요",
      });
     }
    if (predictPrice === 0) {
      setOpen(true);
      setAlertOption({
        severity: "error",
        value: "예측 가격을 선택해 주세요.",
      });
      return;
    }
    if (nowPrice * 0.95 < predictPrice && predictPrice < nowPrice * 1.05) {
      setOpen(true);
      setAlertOption({
        severity: "error",
        value: "현재가와 5% 이상 차이나도록 값을 입력하세요.",
      });
      return;
    }
    if (predictReason === "") {
      setOpen(true);
      setAlertOption({
        severity: "error",
        value: "예측 근거를 입력해 주세요.",
      });
      return;
    }
    if (predictReason.length < 10) {
      setOpen(true);
      setAlertOption({
        severity: "error",
        value: "예측 근거는 10자 이상 입력해 주세요.",
      });
      return;
    }

    const predict = {
      stockName: stockName,
      userNo: 0,
      pdDate: predictDate,
      pdValue: predictPrice,
      preValue: nowPrice,
      pdContent: predictReason,
      pdUpDown: upDown === "상승" ? true : false,
    };
    try {
      await insertPredict(predict);
      setOpen(true);
      setAlertOption({
        severity: "success",
        value: "예측 등록이 완료되었습니다.",
      });
      navigate("/predict");
    } catch (error) {
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSearchChange = (value: {
    stockName: string;
    stockCode: string;
  }) => {
    setStockName(value.stockName);
  };

  const fetchData = async () => {
    try {
      const result = await selectNowPrice(stockName);
      setNowPrice(result);
    } catch (error) {      
    }
  };

  const possibleCheck = async () => {
    const userNo = getJwtUserNo();
    const check = await checkPredict(userNo, stockName);
    return check;
  };

  useEffect(() => {
    const fetchDataAndCheck = async () => {
      const check = await possibleCheck();
      if (check === true) {
        setOpen(true);
        setAlertOption({
          severity: "error",
          value: "이미 예측중인 종목입니다.",
        });
        setStockName("");
        return;
      } else {
        setTime();
        fetchData();
      }
    };
    fetchDataAndCheck();
  }, [stockName]);

  useEffect(() => {
    const date = new Date(predictDate);
    if (date.getDay() === 0 || date.getDay() === 6) {
      setPriceOk(false);
      setOpen(true);
      setAlertOption({
        severity: "error",
        value: "주말 및 공휴일은 예측 불가합니다. 다시 선택해주세요",
      });
     }
  }, [predictDate]);

  useEffect(() => {
    if (nowPrice * 0.95 >= predictPrice) {
      setUpDown("하락");
      setPriceOk(true);
    } else if (nowPrice * 1.05 <= predictPrice) {
      setUpDown("상승");
      setPriceOk(true);
    } else if (nowPrice * 0.95 < predictPrice && predictPrice < nowPrice * 1.05) {
      setPriceOk(false);
      setOpen(true);
      setAlertOption({
        severity: "error",
        value: "현재가와 5% 이상 차이나도록 값을 입력하세요.",
      });
    }
  }, [predictPrice]);

  const refreshPrice = async () => {
    fetchData();
    setTime();
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 500);
  };

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
  };

  return (
    <Wrapper>
      <InputContainer>
        <SearchContainer>
          <label className="small-title">예측 종목</label>
          <Search
            type="text"
            placeholder="종목을 검색해주세요."
            style={searchInputStyle}
            onSearchChange={handleSearchChange}
          />
          {stockName && (
            <>
              <span style={{margin: "30px"}}>
                <span className="highlighter">{currentTime}</span> 기준 <br />
                {stockName}의 현재가는
                <span className="highlighter"> {nowPrice}원</span>
                입니다.
              </span>
              <ImgBtn
                src={Refreshbtn}
                style={{
                  ...refreshStyle,
                  transform: isClicked ? "rotate(-360deg)" : "rotate(0deg)",
                  transition: isClicked ? "transform 0.5s ease" : "none",
                }}
                onClick={refreshPrice}
              />
              <ImgBtn src={Informationbtn} style={informationStyle}>
                <div>
                  <span className="info-highlight">
                    해당 가격을 기준으로 <br />
                    예측글이 등록됩니다. <br />
                    가격을 업데이트 하려면 <br />
                    새로고침을 눌러주세요. <br />
                  </span>
                </div>
              </ImgBtn>
            </>
          )}
        </SearchContainer>
        <PredictInput
          text="예측 날짜"
          type="date"
          min={minDate}
          max={maxDate}
          placeholder="날짜를 선택해주세요."
          onDateChange={handleDateChange}
        />
        <PriceContainer>
          <PredictInput
            text="예측가"
            type="number"
            placeholder="예측 가격을 입력하세요."
            onPriceChange={handlePriceChange}
          />
          {stockName && predictPrice > 0 && priceOk && (
            <>
              <span>
                <b
                  style={{
                    color: upDown === "상승" ? "#930E0E" : "#310E93",
                  }}
                >
                  {upDown}
                </b>{" "}
                한다고 예측합니다.
              </span>
            </>
          )}
        </PriceContainer>
        <PredictReasonInput onReasonChange={handleReasonChange} />
      </InputContainer>
      <BtnContainer>
        <SquareBtn
          text="예측하기"
          style={buttonStyle}
          onClick={handlePredict}
        />
      </BtnContainer>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={alertOption?.severity}>{alertOption?.value}</Alert>
      </Snackbar>
    </Wrapper>
  );
}

export default PredictCreateForm;

const Wrapper = styled.div`
  width: 70vw;
  border: none;
  border-radius: 30px;
  background-color: white;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  padding: 20px 40px;
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

  .info-highlight {
    color: #3d3d3d;
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
  margin: 20px 0 20px 0;
`;
