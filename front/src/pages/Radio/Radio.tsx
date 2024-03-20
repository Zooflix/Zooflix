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
  const [ playing, setPlaying ] = useState(true);
  const playBtn = () => {
    setPlaying(!playing);
    // 서버에 재생 여부를 전달하는 요청
    axios.post('/radio/translation/summary/tts', { playing: !playing })
      .then(response => {
        console.log('서버 응답:', response.data);
      })
      .catch(error => {
        console.error('오류 발생:', error);
      });
  }
  
  // 음향조절
  const [volume, setVolume] = useState(50);
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value);
    setVolume(newVolume);
  };
  
  // tts
  const [audioSrc, setAudioSrc] = useState('');
  const playAudio = async () => {
    try {
      const response = await fetch('/radio/translation/summary/tts'); // 백엔드 엔드포인트로 요청을 보냅니다.
      const audioData = await response.arrayBuffer(); // byte 배열을 받아옵니다.
      const blob = new Blob([audioData], { type: 'audio/wav' }); // byte 배열을 Blob으로 변환합니다.
      const url = URL.createObjectURL(blob); // Blob URL을 생성합니다.
      setAudioSrc(url); // Blob URL을 상태에 저장합니다.
    } catch (error) {
      console.error('Error fetching audio:', error);
    }
  };

  return (
    <Wrapper>
      <Title text="뉴스를 들려줄게요" />
      <h2>playing: { playing? "true":"false" }</h2>
      <PlayContainer>
        <PlayButton img={Playicon} onClick={playBtn} disabled={playing}/>
        <PlayButton img={Pauseicon} onClick={playBtn} disabled={!playing}/>
      </PlayContainer>
      <button onClick={playAudio}>Play Audio</button>
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
