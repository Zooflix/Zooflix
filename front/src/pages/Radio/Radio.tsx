import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

// 이미지
import Playicon from "../../assets/img/button/Play.svg";
import Pauseicon from "../../assets/img/button/Pause.svg";

// 컴포넌트
import Title from "../../components/Common/Title";
import PlayButton from "../../components/Radio/PlayBtn";
import SquareBtn from "../../components/Common/SquareBtn";

// 버튼 스타일
const buttonStyleDark = {
  backgroundColor: "#1E3659",
  color: "white",
  border: "none",
};

function Radio(): JSX.Element {
  // 재생/중단
  const [playing, setPlaying] = useState(true);
  const playBtn = () => {
    setPlaying(!playing);
    // 서버에 재생 여부를 전달하는 요청
    axios
      .post("/radio/translation/summary/tts", { playing: !playing })
      .then((response) => {
        console.log("서버 응답:", response.data);
      })
      .catch((error) => {
        console.error("오류 발생:", error);
      });
  };

  // 음향조절
  const [volume, setVolume] = useState(50);
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value);
    setVolume(newVolume);
  };

  // tts
  const [audioSrc, setAudioSrc] = useState("");
  const fetchAudioData = async () => {
    try {
      axios.post("/radio/translation/summary/tts").then((response) => {
        console.log(response.data);
      });
    } catch (error) {
      console.error("Error fetching audio data:", error);
    }
  };

  return (
    <Wrapper>
      <Title text="뉴스를 들려줄게요" />
      <h2>playing: {playing ? "true" : "false"}</h2>
      <button onClick={fetchAudioData}>불러오기</button>
      <PlayContainer>
        <PlayButton img={Playicon} onClick={playBtn} disabled={playing} />
        <PlayButton img={Pauseicon} onClick={playBtn} disabled={!playing} />
      </PlayContainer>
      {audioSrc && <audio controls src={audioSrc} />}
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolumeChange}
        step="1"
      />
      <span>Volume: {volume}</span>
      <SquareBtn text="자막 보기" style={buttonStyleDark} />
    </Wrapper>
  );
}

export default Radio;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const PlayContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
