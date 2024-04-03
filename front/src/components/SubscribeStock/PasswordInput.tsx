import { ChangeEvent, useEffect } from "react";
import styled from "styled-components";

interface PasswordProps {
  placeholder: string;
  text: string;
  disabled?: boolean;
  onInputChange: (value: string) => void;
}
function PasswordInput({
  placeholder,
  text,
  disabled,
  onInputChange,
}: PasswordProps) {
  function InputChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    onInputChange(value);
  }

  return (
    <Wrapper>
      <label className="small-title">
        {text === "APP 시크릿 키" ? <Secret>{text}</Secret> : text}
      </label>
      <InputContainer>
        <input
          type="password"
          placeholder={placeholder}
          disabled={disabled}
          onChange={InputChange}
        />
      </InputContainer>
    </Wrapper>
  );
}

export default PasswordInput;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  .small-title {
    width: 70px;
    font-weight: bold;
    padding: 5px 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const Secret = styled.label`
  word-break: keep-all;
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
    width: 250px;
  }

  input:focus {
    outline: none;
  }
`;
