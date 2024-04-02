import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { zbtiQuestionState } from "../../Store/ZbtiState";
import { useRecoilState } from "recoil";

// 이미지
import ZbtiStartImg from "../../assets/img/Zbti/ZbtiStartImg.svg";

// 컴포넌트
import ZbtiHeader from "../../components/Zbti/ZbtiHeader";
import StartTest from "../../components/Zbti/StartTest";
import BackBtn from "../../components/Common/BackBtn";

function ZbtiStart() {
  const [zbtiValue, setZbtiValue] = useRecoilState(zbtiQuestionState);
  const navigate = useNavigate();

  const handleStartClick = () => {
    setZbtiValue([]);
    navigate("/problem1");
  };

  return (
    <Wrapper>
      <BackBtn link="/my-page" className="back" />
      {/* <ZbtiHeader backLink="/my-page" /> */}
      <Container>
        <h1>
          <span>나</span>
          <span>의</span>
          <span>&nbsp;</span>
          <span>투</span>
          <span>자</span>
          <span>성</span>
          <span>향</span>
          <span>은</span>
          <span>?</span>
        </h1>
        <ImgContainer>
          <img src={ZbtiStartImg} alt="icon" className="icon" />
        </ImgContainer>
        <StartTest text="주BTI 검사하기" onClick={handleStartClick} />
      </Container>
    </Wrapper>
  );
}

export default ZbtiStart;

const Wrapper = styled.div`
  .icon {
    width: 900px;
  }
  .back {
    margin-left: 40px;
    margin-top: 40px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;

  h1 {
    font-family: WAGURITTF;
    font-weight: lighter;
  }

  h1 span {
    position: relative;
    top: 20px;
    display: inline-block;
    animation: bounce 0.5s ease alternate;
    animation-iteration-count: 2;
    font-size: 50px;
    color: #0d274d;
  }

  h1 span:nth-child(2) {
    animation-delay: 0.1s;
  }
  h1 span:nth-child(3) {
    animation-delay: 0.2s;
  }
  h1 span:nth-child(4) {
    animation-delay: 0.3s;
  }
  h1 span:nth-child(5) {
    animation-delay: 0.4s;
  }
  h1 span:nth-child(6) {
    animation-delay: 0.5s;
  }
  h1 span:nth-child(7) {
    animation-delay: 0.6s;
  }
  h1 span:nth-child(8) {
    animation-delay: 0.7s;
  }
  h1 span:nth-child(9) {
    animation-delay: 0.8s;
  }

  @keyframes bounce {
    100% {
      top: -20px;
      text-shadow: 0 1px 0 #fff, 0 2px 0 #fff, 0 3px 0 #ccc, 0 4px 0 #ccc,
        0 5px 0 #ccc, 0 6px 0 #ccc, 0 7px 0 #ccc, 0 8px 0 #ccc, 0 9px 0 #ccc,
        0 50px 25px rgba(0, 0, 0, 0.2);
    }
  }
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 70px 0 80px;
`;
