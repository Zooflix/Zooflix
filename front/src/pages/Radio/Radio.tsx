import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

// api
import { getCachedData, playRadio } from "../../apis/api/Radio";
import { getMyInfo } from "../../apis/api/MyPage";
import { loginCheck } from "../../components/User/IsLoginCheck";

// state
import { isPausedState } from "../../Store/RadioState";
import { userZbti } from "../../Store/UserState";

// 이미지
import Playicon from "../../assets/img/button/Play.svg";
import Pauseicon from "../../assets/img/button/Pause.svg";

// 컴포넌트
import ImgBtn from "../../components/Common/ImgBtn";
import Title from "../../components/Common/Title";
import Character3d from "../../components/Character/Character3d";
import SquareBtn from "../../components/Common/SquareBtn";
import { myPageInfoState } from "../../Store/MyPageState";


// 버튼 스타일
const buttonStyleDark = {
  backgroundColor: "#1E3659",
  color: "white",
  border: "none",
};

const imgBtnStyle = {
  width: "50px",
  height: "30px",
  margin: "10px 0",
};

const clickBtnStyle = {
  width: "50px",
  borderRadius: "15px",
  padding: "3px",
  margin: "0px 0px 8px 0px",
  boxShadow: "none",
  border: "2px solid #d80000",
  color: "#d80000",
}

function Player() {
  const [isPaused, setIsPaused] = useRecoilState(isPausedState); // 재생, 중단 여부
  const [isClicked, setIsClicked] = useState(0); // 처음 재생버튼 눌렀는지 판단
  const [isLoaded, setIsLoaded] = useState(false); // 오디오 데이터 로딩 여부
  const [userZbtiState, setuserZbtiState] = useRecoilState(userZbti); // zbti

  const audioEl = useRef<HTMLAudioElement>(null);
  const [myInfo, setMyInfo] = useRecoilState(myPageInfoState);
  const [news, setNews] = useState<any[]>([]);
  const [blobUrlList, setBlobUrlList] = useState<string[]>([]);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  
  const [isLogin, setIsLogin] = useState(loginCheck());


  // 마운트: 마이데이터 -> userZbti 불러오기
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (isLogin) {
  //         const response = await getMyInfo();
  //         console.log(response.userZbti);
  //         setMyInfo(response);
  //       }
  //    } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  // tts 생성
  const ttsMaker = async() => {
    const urlList = await playRadio();
    setBlobUrlList(urlList);
    const response = await getCachedData();
    setNews(response);
    setIsLoaded(true);
  }

  // 처음 재생버튼 누르면 tts 준비하기
  useEffect(() => {
    if (isLoaded) {
      // 데이터 로딩되면 첫번째 오디오 재생하자
      if (audioEl.current && blobUrlList.length > 0) {
        audioEl.current.src = blobUrlList[0];
        audioEl.current.play();
      }
    }
  }, [isLoaded]);

  const clickBtn = async() => {
    setIsPaused(!isPaused);
    setIsClicked(isClicked+1);
    console.log(isClicked);
    
  }

  // 재생 중단
  useEffect(() => {
    console.log(isClicked);
    if (isClicked===1 && !isPaused) { // 처음 재생버튼 누르면 tts 준비하기
      ttsMaker();
    } else {
      if (isPaused) {
        audioEl.current?.pause();
      } else {
        audioEl.current?.play();
      };
    }
  }, [isPaused]);


  // 오디오 이벤트
  useEffect(() => {
    const handleAudioEnded = () => {
      const nextIndex = currentAudioIndex+1;
      if (nextIndex < blobUrlList.length - 1) {
        setCurrentAudioIndex(nextIndex);
      } else {
        setCurrentAudioIndex(0);
        setIsClicked(0); // 재생이 끝나면 버튼을 초기 상태로 되돌림
      }
    };

    if (audioEl.current) {
      audioEl.current.addEventListener("ended", handleAudioEnded);
      return () => {
        audioEl.current?.removeEventListener("ended", handleAudioEnded);
      };
    }
  }, [currentAudioIndex, blobUrlList.length]);


  // currentIdx가 바뀔 때마다 src 갱신
  useEffect(()=> {
    if(audioEl.current) {
      audioEl.current.src = blobUrlList[currentAudioIndex];
    }
    if (!isPaused) {
      setTimeout(() => {
        audioEl.current?.play();
      }, 1000);
    }
  }, [currentAudioIndex])


  return (
    <Wrapper>
      <PlayContainer>
        <LeftContainer>
          <Title text="해외 뉴스를 들려줄게요" />
          {myInfo && (
            <Character3d
            name={userZbtiState}
            characterScale={0.52}
            canvasWidth={400}
            canvasHeight={550}
            toBelow={35}
            action="turn"
            />
          )}
          {isPaused ? (
              <ImgBtn
                src={Playicon}
                onClick={clickBtn}
                disabled={isPaused ? false : true}
                style={imgBtnStyle}
              ></ImgBtn>
            ) : (
              <ImgBtn
                src={Pauseicon}
                onClick={clickBtn}
                disabled={isPaused ? true : false}
                style={imgBtnStyle}
              ></ImgBtn>
            )}
            <audio ref={audioEl} />
        </LeftContainer>
        <MiddleContainer />
        <RightContainer>
          <RightDetailContainer>
            {news.length===0? (
            <ContentContainer>
              <NewsTitle>
                <p>라디오를 재생해주세요!</p>
              </NewsTitle>
            </ContentContainer>
            ) : (
            <ContentContainer>
              <NewsTitle>
                <SquareBtn text="click!"  style={clickBtnStyle}/> <br/>
                <a href={news[currentAudioIndex]?.[0]}>
                  {news[currentAudioIndex]?.[1]}
                </a>
              </NewsTitle>
              <p>{news[currentAudioIndex]?.[2]}</p>
            </ContentContainer>
            )}
          </RightDetailContainer>
        </RightContainer>
      </PlayContainer>
    </Wrapper>
  );
}

export default Player;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const PlayContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MiddleContainer = styled.div`
  width: 50px;
`;

const RightContainer = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 100px;
  align-content: space-between;
`;

const RightDetailContainer = styled.div`
  margin: auto 0;
`;


const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 430px;

  p {
    font-weight: bold;
    margin-top: 40px;
    word-break: keep-all;
  }
`;

const NewsTitle = styled.div`
  font-family: NanumSquareRound;
  align-items: center;
  font-size: 17px;

  a {
    font-family: NPSfontBold;
    text-decoration: none;
    color: #1899e8;
    font-weight: bolder;
    font-size: 23px;
    word-break: keep-all;
  }

  button {
    &:hover {
      color: #d80000;
      background-color: #ffffff;
    }
  }
`;