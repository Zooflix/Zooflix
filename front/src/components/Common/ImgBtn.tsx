import styled from "styled-components";
import { useState } from "react";

// 컴포넌트
import Informationbtn from "../../assets/img/button/Informationbtn.svg";

type ImgBtnProps = {
  src: string;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

function ImgBtn(props: ImgBtnProps) {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Wrapper>
      <Button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        <ButtonImg src={props.src} style={props.style} />
        {props.src === Informationbtn && isHovered && (
          <Information>
            {props.children}
          </Information>
        )}
      </Button>
    </Wrapper>
  );
}

export default ImgBtn;

const Wrapper = styled.div`
  color: #3d3d3d;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  position: relative;
  &:hover div {
    display: block; /* hover 시에만 정보창을 표시합니다. */
  }
`;
const ButtonImg = styled.img`
  cursor: pointer;
`;

const Information = styled.div`
  display: none; /* 기본적으로는 숨깁니다. */
  position: absolute; /* 절대 위치로 설정하여 겹쳐지게 합니다. */
  top: 110%;
  left: 100%;
  z-index: 2; /* 다른 요소 위에 나타나도록 z-index를 설정합니다. */
  background-color: lightgray;
  color: gray;
  font-size: 12px;
  padding: 5px;
  width: 150px;
  border-radius: 0 10px 10px 10px;
  color: #4b4b4b;
  font-weight: bold;
  word-break: keep-all;
}
`;
