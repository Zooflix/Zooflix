import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { zbtiState } from "../../Store/ZbtiState";
import { useNavigate } from "react-router";
import html2canvas from "html2canvas";

import sloth from "../../assets/img/Portfolio/sloth.svg";
import cow from "../../assets/img/Portfolio/cow.svg";
import fox from "../../assets/img/Portfolio/fox.svg";
import hippo from "../../assets/img/Portfolio/hippo.svg";
import lion from "../../assets/img/Portfolio/lion.svg";
import monkey from "../../assets/img/Portfolio/monkey.svg";
import panda from "../../assets/img/Portfolio/panda.svg";
import pig from "../../assets/img/Portfolio/pig.svg";
import rabbit from "../../assets/img/Portfolio/rabbit.svg";
import unicorn from "../../assets/img/Portfolio/unicorn.svg";
import zebra from "../../assets/img/Portfolio/zebra.svg";
import ZbtiHeader from "../../components/Zbti/ZbtiHeader";

import Download from "../../assets/img/button/DownloadBtn.svg";
import Refresh from "../../assets/img/button/Refresh.svg";

function ZbtiResult() {
  const zbtiValue = useRecoilValue(zbtiState);
  console.log(zbtiValue);

  const isSloth =
    JSON.stringify(zbtiValue) === JSON.stringify([2, 1, 1, 2, 1, 2, 1, 2]);
  const isHippo =
    JSON.stringify(zbtiValue) === JSON.stringify([1, 1, 1, 2, 1, 1, 2, 1]);
  const isUnicorn =
    JSON.stringify(zbtiValue) === JSON.stringify([1, 2, 2, 2, 1, 1, 2, 2]);
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

  const navigate = useNavigate();
  const handleRetry = () => {
    navigate("/zbti");
  };

  //캡처이미지로 다운로드
  const onCapture = () => {
    html2canvas(document.getElementById("imageWrapper") as HTMLElement).then(
      (canvas: any) => {
        onSaveAs(canvas.toDataURL("image/png"), "");
      }
    );
  };
  const onSaveAs = (uri: string, filename: string) => {
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.download = filename;
    link.href = uri;
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container>
      <ZbtiHeaderContainer>
        <ZbtiHeader backLink="/my-page" />
      </ZbtiHeaderContainer>
      <div className="imageWrapper" id="imageWrapper">
        <Header>
          <h1>다라란님의 투자 성향은?</h1>
        </Header>
        {isSloth && <img src={sloth} alt="sloth portfolio" />}
        {isHippo && <img src={hippo} alt="hippo portfolio" />}
        {isUnicorn && <img src={unicorn} alt="unicorn portfolio" />}
        {isFox && <img src={fox} alt="fox portfolio" />}
        {isRabbit && <img src={rabbit} alt="rabbit portfolio" />}
        {isPig && <img src={pig} alt="pig portfolio" />}
        {isMonkey && <img src={monkey} alt="monkey portfolio" />}
        {isCow && <img src={cow} alt="cow portfolio" />}
        {isZebra && <img src={zebra} alt="zebra portfolio" />}
        {isLion && <img src={lion} alt="lion portfolio" />}
        {/* 나머지는 판다 */}
        {!isSloth &&
          !isHippo &&
          !isUnicorn &&
          !isFox &&
          !isRabbit &&
          !isPig &&
          !isMonkey &&
          !isCow &&
          !isZebra &&
          !isLion && <img src={panda} alt="panda portfolio" />}
      </div>
      <ButtonContainer>
        <DownloadButton onClick={onCapture}>
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
