import styled from "styled-components";
import { useState } from "react";

// 이미지
import Playicon from "../../assets/img/button/Play.svg";
import Pauseicon from "../../assets/img/button/Pause.svg";

// 컴포넌트
import Title from "../../components/Common/Title";
import PlayButton from "../../components/Radio/PlayBtn";
import SquareBtn from "../../components/Common/SquareBtn";

const buttonStyleDark = {
  backgroundColor: "#1E3659",
  color: "white",
  border: "none",
};


function Radio(): JSX.Element {
  // 재생/중단
  const [ playing, setPlaying ] = useState(true);
  const playBtn = () => {
    setPlaying(!playing);
    console.log(playing);
  }

  // 음향조절
  const [volume, setVolume] = useState(50);
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value);
    setVolume(newVolume);
  };
  return (
    <Wrapper>
      <Title text="뉴스를 들려줄게요" />
      <h2>playing: { playing? "true":"false" }</h2>
      <PlayContainer>
        <PlayButton img={Playicon} onClick={playBtn} disabled={playing}/>
        <PlayButton img={Pauseicon} onClick={playBtn} disabled={!playing}/>
      </PlayContainer>
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
