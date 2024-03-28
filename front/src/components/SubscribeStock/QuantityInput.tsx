import { diffProps } from "@react-three/fiber/dist/declarations/src/core/utils";
import styled from "styled-components";
import { useState, useEffect } from "react";

// 이미지
import Informationbtn from "../../assets/img/button/Informationbtn.svg";

// 컴포넌트
import ImgBtn from "../Common/ImgBtn";

// 스타일
const informationStyle = {
  backgroundColor: "transparent",
  border: "none",
};



interface InputProps {
  placeholder?: string;
  text: string;
}

function QuantityInput(props: InputProps) {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(()=>{
    setTime();
    setCurrentTime(currentTime);
  },[]);

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

  return (
    <Wrapper>
      <label>{props.text}</label>
      <InputContainer>
        <input type="number" placeholder={props.placeholder} /> 주
      </InputContainer>
      <span className="highlighter">예상가격 <br/> {currentTime} </span>
      <ImgBtn src={Informationbtn} style={informationStyle} information={{text: "✶ 현재 시장가X수량"}}/>
    </Wrapper>
  );
}

export default QuantityInput;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  label {
    padding-top: 20px;
    margin-right: 30px;
    font-weight: bold;
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
  margin-right: 30px;

  input {
    border: none;
    margin-left: 10px;
    height: 40px;
    width: 80px;
  }

  input:focus {
    outline: none;
  }
`;
