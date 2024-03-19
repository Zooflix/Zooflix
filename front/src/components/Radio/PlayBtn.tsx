import styled from "styled-components";
import { useState } from "react";

type PlayBtnProps = {
  img: string;
  onClick: (e: React.MouseEvent<HTMLSpanElement>) => void;
  disabled: boolean;
};

function PlayBtn(props: PlayBtnProps) {

  return (
      <div>
        <Button onClick={props.onClick} disabled={props.disabled}>
          <ButtonImg src={props.img}/>
        </Button>
      </div>
  );
}

export default PlayBtn   ;

const Button = styled.button`
  background-color: transparent;
  border: none;
  margin: 5px 0 20px;
  outline: none;
`;
const ButtonImg = styled.img`
  width: 50px;
  height: 30px;
  cursor: pointer;
`;