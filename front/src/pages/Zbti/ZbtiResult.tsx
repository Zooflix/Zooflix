import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { zbtiQuestionState } from "../../Store/ZbtiState";
import { myPageInfoState } from "../../Store/MyPageState";
import { useNavigate } from "react-router";
import html2canvas from "html2canvas";
import saveAs from "file-saver";

// api
import { zbtiUpdate } from "../../apis/api/User";

// 이미지
import Sloth from "../../assets/img/Portfolio/sloth.svg";
import Cow from "../../assets/img/Portfolio/cow.svg";
import Fox from "../../assets/img/Portfolio/fox.svg";
import Hippo from "../../assets/img/Portfolio/hippo.svg";
import Lion from "../../assets/img/Portfolio/lion.svg";
import Monkey from "../../assets/img/Portfolio/monkey.svg";
import Panda from "../../assets/img/Portfolio/panda.svg";
import Pig from "../../assets/img/Portfolio/pig.svg";
import Rabbit from "../../assets/img/Portfolio/rabbit.svg";
import Unicorn from "../../assets/img/Portfolio/unicorn.svg";
import Zebra from "../../assets/img/Portfolio/zebra.svg";
import Download from "../../assets/img/button/DownloadBtn.svg";
import Refresh from "../../assets/img/button/Refresh.svg";

// 컴포넌트
import ZbtiHeader from "../../components/Zbti/ZbtiHeader";
import { useEffect, useRef } from "react";
import { getJwtUserName } from "../../apis/utils/jwt";

import { userZbti } from "../../Store/UserState";
import { getMyInfo } from "../../apis/api/MyPage";

interface ImgMap {
  [key: string]: string;
}

const imgList: ImgMap = {
  Sloth: Sloth,
  Cow: Cow,
  Fox: Fox,
  Hippo: Hippo,
  Lion: Lion,
  Monkey: Monkey,
  Panda: Panda,
  Pig: Pig,
  Rabbit: Rabbit,
  Unicorn: Unicorn,
  Zebra: Zebra,
};

function ZbtiResult() {
  const zbtiValue = useRecoilValue(zbtiQuestionState);
  const [myInfo, setMyInfo] = useRecoilState(myPageInfoState);
  console.log(zbtiValue);
  const [userZbtiState, setUserZbtiState] = useRecoilState(userZbti);

  const isSloth =
    JSON.stringify(zbtiValue) === JSON.stringify([2, 1, 1, 2, 1, 2, 1, 2]);
  const isHippo =
    JSON.stringify(zbtiValue) === JSON.stringify([1, 1, 1, 2, 1, 1, 2, 1]);
  const isUnicorn =
    JSON.stringify(zbtiValue) === JSON.stringify([1, 2, 2, 2, 1, 1, 2, 1]);
  const isFox =
    JSON.stringify(zbtiValue) === JSON.stringify([1, 1, 2, 1, 1, 2, 1, 1]);
  const isRabbit =
    JSON.stringify(zbtiValue) === JSON.stringify([2, 2, 2, 1, 1, 1, 1, 2]);
  const isPig =
    JSON.stringify(zbtiValue) === JSON.stringify([2, 1, 1, 1, 2, 2, 1, 2]);
  const isZebra =
    JSON.stringify(zbtiValue) === JSON.stringify([2, 2, 1, 1, 2, 2, 1, 2]);
  const isMonkey =
    JSON.stringify(zbtiValue) === JSON.stringify([1, 2, 2, 2, 1, 1, 2, 2]);
  const isCow =
    JSON.stringify(zbtiValue) === JSON.stringify([2, 1, 1, 1, 2, 2, 1, 1]);
  const isLion =
    JSON.stringify(zbtiValue) === JSON.stringify([1, 2, 2, 1, 1, 1, 2, 2]);

  const setZbti = async () => {
    if (isSloth) {
      setMyInfo((prevMyInfo) => ({
        ...prevMyInfo,
        userZbti: "Sloth",
      }));
    } else if (isHippo) {
      setMyInfo((prevMyInfo) => ({
        ...prevMyInfo,
        userZbti: "Hippo",
      }));
    } else if (isUnicorn) {
      setMyInfo((prevMyInfo) => ({
        ...prevMyInfo,
        userZbti: "Unicorn",
      }));
    } else if (isFox) {
      setMyInfo((prevMyInfo) => ({
        ...prevMyInfo,
        userZbti: "Fox",
      }));
    } else if (isRabbit) {
      setMyInfo((prevMyInfo) => ({
        ...prevMyInfo,
        userZbti: "Rabbit",
      }));
    } else if (isPig) {
      setMyInfo((prevMyInfo) => ({
        ...prevMyInfo,
        userZbti: "Pig",
      }));
    } else if (isZebra) {
      setMyInfo((prevMyInfo) => ({
        ...prevMyInfo,
        userZbti: "Zebra",
      }));
    } else if (isMonkey) {
      setMyInfo((prevMyInfo) => ({
        ...prevMyInfo,
        userZbti: "Monkey",
      }));
    } else if (isCow) {
      setMyInfo((prevMyInfo) => ({
        ...prevMyInfo,
        userZbti: "Cow",
      }));
    } else if (isLion) {
      setMyInfo((prevMyInfo) => ({
        ...prevMyInfo,
        userZbti: "Lion",
      }));
    } else if (zbtiValue.length > 0) {
      setMyInfo((prevMyInfo) => ({
        ...prevMyInfo,
        userZbti: "Panda",
      }));
    }
  };

  useEffect(() => {
    fetchData();
    setZbti();
  }, []);

  useEffect(() => {
    console.log(myInfo.userZbti);
    zbtiUpdate(myInfo.userZbti);
    setUserZbtiState(myInfo.userZbti);
  }, [myInfo.userZbti]);

  const fetchData = async () => {
    //내 정보
    const dataInfo = await getMyInfo()
      .then((resInfo) => {
        setMyInfo(resInfo);
        setZbti();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  
  const navigate = useNavigate();
  const handleRetry = () => {
    navigate("/zbti");
  };

  //캡처이미지로 다운로드
  const divRef = useRef<HTMLDivElement>(null);
  const handleDownload = async () => {
    if (!divRef.current) return;

    try {
      const div = divRef.current;
      const canvas = await html2canvas(div, { scale: 2 });
      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, "나만의 포트폴리오.png");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container ref={divRef}>
      <ZbtiHeaderContainer>
        <ZbtiHeader backLink="/my-page" />
      </ZbtiHeaderContainer>
      <Header>
        <h1>{getJwtUserName()}님의 투자 성향은?</h1>
      </Header>
      <PortfolioImg src={imgList[myInfo.userZbti]} />
      <ButtonContainer>
        <DownloadButton onClick={handleDownload}>
          <img src={Download} alt="다운로드" />
          <div>다운로드</div>
        </DownloadButton>
        <RetryButton onClick={handleRetry}>
          <img src={Refresh} alt="재시도" />
          <div>다시하기</div>
        </RetryButton>
      </ButtonContainer>
    </Container>
  );
}
export default ZbtiResult;

const Container = styled.div`
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
`;

const ZbtiHeaderContainer = styled.div`
  position: absolute;
  z-index: 1;
`;

const Header = styled.div`
  position: absolute;
  z-index: 1;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding-top: 100px;
  h1 {
    color: white;
    text-shadow: 2px 2px 2px gray;
  }
`;

const PortfolioImg = styled.img``;

const ButtonContainer = styled.div`
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: row;
  top: 90%;
  left: 70%;
`;
const DownloadButton = styled.button`
  border: none;
  border-radius: 35px;
  height: 60px;
  width: 150px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  flex-direction: row;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  padding-right: 10px;
  padding-left: 10px;
  margin-right: 30px;
  img {
    width: 30px;
  }
  div {
    font-size: 20px;
    margin-top: 15px;
  }
`;
const RetryButton = styled.button`
  border: none;
  border-radius: 35px;
  height: 60px;
  width: 150px;
  background-color: black;
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding-right: 10px;
  padding-left: 10px;
  img {
    width: 30px;
    margin-right: 5px;
  }
  div {
    font-size: 20px;
    color: white;
    margin-top: 17px;
  }
`;
