import React, { useState } from "react";
import styled from "styled-components";

type InputProps = {
  type: string;
  placeholder?: string;
  style?: React.CSSProperties;
  readonly?: boolean;
  value?: string;
  onChange?: (e: any) => void;
};

function UserInput(props: InputProps) {
  return (
    <Wrapper>
      <input        
        type={props.type}
        placeholder={props.placeholder}
        style={props.style}
        readOnly={props.readonly}
        onChange={props.onChange}
        value={props.value}
      />
    </Wrapper>
  );
}

export default UserInput;

const Wrapper = styled.div`
  input {
    height: 50px;
    width: 380px;
    background-color: rgba(255, 255, 255, 0.5);
    border: none;
    border-radius: 20px;
    margin: 10px 0;
    font-family: "NanumSquareRound";
    font-weight: bold;
    padding: 0 20px;
    color: #091034;

    ::placeholder {
      color: #091034;
    }
  }
`;
