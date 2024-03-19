import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import PageTransition from "../../components/Zbti/PageTransition";
import ZbtiHeader from "../../components/Zbti/ZbtiHeader";
import Question from "../../components/Zbti/Question";
import Icon from "../../assets/img/ZbtiIcon/question5.svg";
import Answer from "../../components/Zbti/Answer";

function Problem5() {
  const navigate = useNavigate();

  const handleAnswerClick = () => {
    navigate("/problem6");
  };
  return (
    <PageTransition>
      <Wrapper>
        <ZbtiHeader />
        <Question text="오늘 꿈에서 A기업 호재가 나왔다." />
        <ImgContainer>
          <img
            src={Icon}
            alt="icon"
            className="icon"
            loading="lazy"
            decoding="async"
          />
        </ImgContainer>
        <Answer
          text="무조건 사! 이건 수익률 백퍼 높아"
          onClick={handleAnswerClick}
        />
        <Answer
          text="아니야. 꿈은 꿈일뿐 정보를 더 찾아보자"
          onClick={handleAnswerClick}
        />
      </Wrapper>
    </PageTransition>
  );
}

export default Problem5;

const Wrapper = styled.div`
  .icon {
    width: 400px;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
`;
