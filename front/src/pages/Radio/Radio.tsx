import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { playRadio } from "../../apis/api/Radio";
import { atom, useRecoilState } from "recoil";

// 이미지
import Playicon from "../../assets/img/button/Play.svg";
import Pauseicon from "../../assets/img/button/Pause.svg";

// 컴포넌트
import Title from "../../components/Common/Title";
import ImgBtn from "../../components/Common/ImgBtn";
import Character3d from "../../components/Character/Character3d";
import SquareBtn from "../../components/Common/SquareBtn";
import { isPausedState } from "../../Store/RadioState";

// 버튼 스타일
const buttonStyleDark = {
  backgroundColor: "#1E3659",
  color: "white",
  border: "none",
};

const imgBtnStyle = {
  width: "50px",
  height: "30px",
  margin: "5px 0 20px",
};

function Player() {
  const [isPaused, setIsPaused] = useRecoilState(isPausedState);
  const audioEl = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    ttsMaker();
  }, []);

  useEffect(() => {
    console.log(isPaused);
  }, [isPaused]);

  const ttsMaker = async () => {
    const url = await playRadio();
    if (audioEl.current) {
      audioEl.current.src = url;
    }
  };

  const clickBtn = () => {
    setIsPaused(!isPaused);
    if (!isPaused) {
      audioEl.current?.pause();
    } else {
      audioEl.current?.play();
    }
  };

  const subtitle = () => {};

  return (
    <Wrapper>
      <Title text="뉴스를 들려줄게요" />
      <PlayContainer>
        <audio ref={audioEl} />
        <ImgBtn
          src={Playicon}
          onClick={clickBtn}
          disabled={isPaused ? false : true}
          style={imgBtnStyle}
        ></ImgBtn>
        <ImgBtn
          src={Pauseicon}
          onClick={clickBtn}
          disabled={isPaused ? true : false}
          style={imgBtnStyle}
        ></ImgBtn>
      </PlayContainer>
      <Character3d
        name="Bear"
        characterScale={0.58}
        canvasWidth={400}
        canvasHeight={440}
        toBelow={35}
        action="turn"
      />
      <SquareBtn text="자막보기" style={buttonStyleDark} />
    </Wrapper>
  );
}

export default Player;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const PlayContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
