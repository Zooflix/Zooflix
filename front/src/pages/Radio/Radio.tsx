import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { playRadio } from "../../apis/api/Radio";

// 이미지
import Playicon from "../../assets/img/button/Play.svg";
import Pauseicon from "../../assets/img/button/Pause.svg";

// 컴포넌트
import Title from "../../components/Common/Title";
import ImgBtn from "../../components/Common/ImgBtn";
import SquareBtn from "../../components/Common/SquareBtn";
import { log } from "console";

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
}

// function Radio(): JSX.Element {
//   const [audioUrl, setAudioUrl] = useState<string|null>(null);
//   useEffect(()=>{
//     const url = playRadio();
//     fetch('http://localhost:8089/radio')
//     .then(response => response.blob())
//     .then(data => {
//         const url = URL.createObjectURL(data);
//         setAudioUrl(url);
//     });
//   }, []);

//   const playAudio = () => {
//     if (audioUrl) {
//       const audio = new Audio(audioUrl);
//       audio.play();
//     }
//   }

//   // const [audioRef, setAudioRef] = useState<HTMLAudioElement|null>(null);
//   // const [isPlaying, setIsPlaying] = useState<Boolean>(false);
//   // const audioCache: string[] = [];

//   // useEffect(() => {
//   //   console.log("useEffect");
//   //   console.log(audioRef);
//   //   console.log(isPlaying);
    
    
//   // }, [audioRef, isPlaying]);

//   // const ttsMaker = async (): Promise<string> => {
//   //   try {
//   //     const url = await playRadio();
//   //     if (url) {
//   //       audioCache[0]=url; // 결과를 캐시에 저장
//   //       return url;
//   //     } else {
//   //       return "error ttsMaker";
//   //     }
//   //   } catch (error) {
//   //     console.log("Error: "+error);
//   //     return "";
//   //   }
//   // }

//   // // 재생
//   // const autoAudio = () => {
//   //   //기존 오디오 끊기
//   //   if (audioRef !== null) {
//   //     setIsPlaying(false);
//   //     audioRef.pause();
//   //   };
    
//   //   // 이미 캐시된 결과가 있는지 확인
//   //   if (audioCache[0]!=null) {
//   //     const newAudio = new Audio(audioCache[0]);
//   //     setAudioRef(newAudio);
//   //     // 재생이 끝나면 false처리
//   //     newAudio.onended = () => {
//   //       console.log("처리됐나요?");
//   //       setIsPlaying(false);
//   //     };
//   //     setIsPlaying(true);
//   //     setAudioRef(newAudio); // audioRef 설정 후에 호출
//   //     newAudio.play(); // play 호출은 여기서
//   //   } else {
//   //     ttsMaker().then((url) => {
//   //       if (url) {
//   //         const newAudio = new Audio(url); // 새로운 오디오 할당
//   //         setAudioRef(newAudio);
//   //         console.log("setAudioRef(newAudio)"+audioRef);
          
//   //         // 재생이 끝나면 false처리
//   //         newAudio.onended = () => {
//   //           console.log("처리됐나?");
//   //           setIsPlaying(false);
//   //         };
//   //         setIsPlaying(true);
//   //         setAudioRef(newAudio); // audioRef 설정 후에 호출
//   //         newAudio.play(); // play 호출은 여기서
//   //       }
//   //     });
//   //   }
//   // }

//   // // 중지
//   // const audioPause = () => {
//   //   if (audioRef != null) {
//   //     if (!isPlaying) {
//   //       audioRef.play();
//   //       setIsPlaying(true);
//   //     } else {
//   //       audioRef.pause();
//   //       setIsPlaying(false);
//   //     }
//   //   }
//   // }


//   return (
//     <Wrapper>
//       <Title text="뉴스를 들려줄게요" />
//       <PlayContainer>
//         {/* <ImgBtn src={isPlaying? Pauseicon : Playicon} style={imgBtnStyle} onClick={isPlaying? audioPause:autoAudio} /> */}
//         {/* <ImgBtn src={Pauseicon} style={imgBtnStyle} onClick={togglePause} disabled={!isPlaying? true:false}/> */}
//         {/* <audio ref={(ref) => setAudioRef(ref)} /> */}
//         <button onClick={playAudio}>Play audio</button>
//       </PlayContainer>
//       <SquareBtn text="자막 보기" style={buttonStyleDark} />
//     </Wrapper>
//   );
// }

// export default Radio;

function RadioPlayer(): JSX.Element {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(new Audio);


  const ttsMaker = async () => {
    const audio = audioRef.current;

    if (!isPlaying) {
      const blob = await playRadio();
      if (!blob) {
        console.log("Error blob");
        return;
      }
      const url = URL.createObjectURL(blob);
      audio.src=url;
      await audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
    
  }

  return (
    <Wrapper>
      {isPlaying ? (
        <button onClick={ttsMaker}>Stop Radio</button>
      ) : (
        <button onClick={ttsMaker}>Play Radio</button>
      )}
    </Wrapper>
  );
};

export default RadioPlayer;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const PlayContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
