import { ChangeEvent } from "react";
import styled from "styled-components";

interface InputProps {
  text?: string;
  placeholder: string;
  onDayChange: (value: number) => void;
}

function SubscribeDateInput(props: InputProps) {
  const changeDay = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    props.onDayChange(value);
  };

  return (
    <Wrapper>
      <label>{props.text}</label>
      <InputContainer>
        매월{" "}
        <input
          type="number"
          placeholder={props.placeholder}
          onChange={changeDay}
          min="1"
          max="31"
          required
        />
        일에 구독을 신청합니다.
      </InputContainer>
    </Wrapper>
  );
}

export default SubscribeDateInput;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  label {
    width: 50px;
    font-weight: bold;
    padding: 5px 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
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
  font-size: 13px;

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
