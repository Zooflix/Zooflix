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
  const [currentUrl, setCurrentUrl] = useState('');
  const [isClicked, setIsClicked] = useState(Boolean);
  const [firstPlay, setFirstPlay] = useState(0);

  useEffect(() => {
    setCurrentUrl(window.location.href);
    setFirstPlay(0);
  }, []);
  
  useEffect(() => {
    console.log(isPaused);
  }, [isPaused]);
  
  useEffect(() => {
    console.log(currentUrl);
    if (currentUrl === 'http://localhost:3000/radio') {
      setIsPaused(true);
    }
  }, [currentUrl])

  useEffect(() => {
    if (isClicked && firstPlay===1) {
      ttsMaker();
    }
  }, [isClicked])


  // audio 요소의 재생 완료 이벤트 처리
  useEffect(() => {
    const handleAudioEnded = () => {
      setIsPaused(true); // 재생이 완료되면 isPaused를 true로 설정
    };
    if (audioEl.current) {
      audioEl.current.addEventListener("ended", handleAudioEnded);
    }
    return () => {
      if (audioEl.current) {
        audioEl.current.removeEventListener("ended", handleAudioEnded);
      }
    };
  }, [setIsPaused]);

  const ttsMaker = async () => {
    const url = await playRadio();
    if (audioEl.current) {
      const previousUrl = audioEl.current.src;
      if (previousUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previousUrl); // 이전 Blob URL 해제
      }
      audioEl.current.src = url;
    }
  };

  const clickBtn = () => {
    setIsPaused(!isPaused);
    setIsClicked(true);
    setFirstPlay(firstPlay+1);
    if (!isPaused) {
      audioEl.current?.pause();
    } else {
      audioEl.current?.play();
    }
  };

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
