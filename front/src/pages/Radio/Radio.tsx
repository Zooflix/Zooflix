import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

// api
import { getCachedData, playRadio } from "../../apis/api/Radio";
import { getMyInfo } from "../../apis/api/MyPage";
import { loginCheck } from "../../components/User/IsLoginCheck";

// state
import { isPausedState } from "../../Store/RadioState";

// 이미지
import Playicon from "../../assets/img/button/Play.svg";
import Pauseicon from "../../assets/img/button/Pause.svg";

// 컴포넌트
import ImgBtn from "../../components/Common/ImgBtn";
import Title from "../../components/Common/Title";
import Character3d from "../../components/Character/Character3d";
import SquareBtn from "../../components/Common/SquareBtn";
import { myPageInfoState } from "../../Store/MyPageState";
import PageTransition from "../../components/Zbti/PageTransition";
import CommonPageTransition from "../../components/Common/CommonPageTransition";

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
  const [cnt, setCnt] = useState(0);

  const audioEl = useRef<HTMLAudioElement>(null);
  const [myInfo, setMyInfo] = useRecoilState(myPageInfoState);
  const [news, setNews] = useState<any[]>([]);
  const [blobUrlList, setBlobUrlList] = useState<string[]>([]);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  
  const [isLogin, setIsLogin] = useState(loginCheck());



  // 마운트: 마이데이터 -> userZbti 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLogin) {
          const response = await getMyInfo();
          console.log(response.userZbti);
          setMyInfo(response);
        }
     } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  
  // tts 재생
  const ttsMaker = async () => {
    const urlList = await playRadio();
    setBlobUrlList(urlList);
    const response = await getCachedData();
    setNews(response);
  };

  // blobUrlList가 변화되면 0번째부터 틀기
  useEffect(()=>{
    if (audioEl.current) {
      audioEl.current.src = blobUrlList[0];
    }
  }, [blobUrlList])

  // 재생/중단 버튼
  const clickBtn = () => {
    setIsPaused(!isPaused);
    setIsClicked(isClicked+1);
    setCnt(cnt+1);

    // if (isClicked===1) {
    //   ttsMaker();
    //   setIsLoaded(true);
    // }
    
    if (!isPaused) {
      audioEl.current?.pause();
    } else {
      audioEl.current?.play();
    }
  };

  // 처음 재생버튼 누를 때만 tts 로딩
  useEffect(() => {
    if (isClicked===1) {
      ttsMaker();
      setIsLoaded(true);
    }
  }, [isClicked]);



  // audio 요소의 재생 완료 이벤트 처리
  useEffect(() => {
    const handleAudioEnded = () => {
      setIsPaused(true);
      if (currentAudioIndex < blobUrlList.length - 1) {
        setCurrentAudioIndex(currentAudioIndex + 1);
        setIsPaused(false); // 다음 오디오 재생을 위해 변경
        setCnt(0); // 다음 오디오 재생을 위해 변경
      } else {
        setCurrentAudioIndex(0); // 마지막 오디오라면 처음으로 다시 재생
        setIsClicked(0);
      }
    };
    console.log("currentAudioIndex: ", currentAudioIndex);
    

    if (audioEl.current) {
      audioEl.current.addEventListener("ended", handleAudioEnded);
    }
    return () => {
      if (audioEl.current) {
        audioEl.current.removeEventListener("ended", handleAudioEnded);
      }
    };
  }, [currentAudioIndex]);


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
            name={isLogin? myInfo.userZbti:"Bear"}
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