import { diffProps } from "@react-three/fiber/dist/declarations/src/core/utils";
import { useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import { selectNowPrice } from "../../apis/api/Predict";

// 이미지
import Refreshbtn from "../../assets/img/button/Refreshbtn.svg";
import Informationbtn from "../../assets/img/button/Informationbtn.svg";

// 컴포넌트
import ImgBtn from "../Common/ImgBtn";

// 스타일
const refreshStyle = {
  marginLeft: "3px",
  marginRight: "4px",
  backgroundColor: "transparent",
  border: "none",
};

const informationStyle = {
  backgroundColor: "transparent",
  border: "none",
};

interface InputProps {
  placeholder?: string;
  text: string;
  stockCntChange: (stock: number) => void;
}

function QuantityInput(props: InputProps) {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isClicked, setIsClicked] = useState(false);

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

  const refreshPrice = async () => {
    setTime();
    setIsClicked(true); // 버튼 클릭 시 회전
    setTimeout(() => setIsClicked(false), 500);
  };

  function current() {
    return (
      <div>
        <span>
          현재 시장가 x 수량 <br />
          {currentTime}
        </span>
      </div>
    );
  }

  function stockCntChange(event: ChangeEvent<HTMLInputElement>) {
    const value = parseInt(event.target.value);
    props.stockCntChange(value);
  }

  return (
    <Wrapper>
      <label>{props.text}</label>
      <InputContainer>
        <input
          type="number"
          placeholder={props.placeholder}
          onChange={stockCntChange}
          min="1"
        />{" "}
        주
      </InputContainer>
      <span>
        예상가격 <br />
        <span className="highlighter">780000원</span>
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
        <span className="info-highlight">
          현재 시장가 x 수량 <br />
          {currentTime}
        </span>
      </ImgBtn>
    </Wrapper>
  );
}

export default QuantityInput;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  label {
    width: 50px;
    font-weight: bold;
    padding: 5px 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  span {
    margin-right: 3px;
  }

  .info-highlight {
    color: #3d3d3d;
  }
`;

const InputContainer = styled.div`
  border: solid 1px;
  border-radius: 15px;
  margin: 10px 0;
  font-weight: bold;
  padding: 0 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: none;
  background-color: white;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  margin-right: 18px;

  input {
    border: none;
    margin-left: 10px;
    height: 40px;
    width: 50px;
  }

  input:focus {
    outline: none;
  }
`;

const TimeStamp = styled.span`
  word-break: keep-all;
`;
