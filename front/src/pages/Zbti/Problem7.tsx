import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import PageTransition from "../../components/Zbti/PageTransition";
import ZbtiHeader from "../../components/Zbti/ZbtiHeader";
import Question from "../../components/Zbti/Question";
import Icon from "../../assets/img/ZbtiIcon/question7.svg";
import Answer from "../../components/Zbti/Answer";

function Problem7() {
  const navigate = useNavigate();

  const handleAnswerClick = () => {
    navigate("/problem8");
  };
  return (
    <PageTransition>
      <Wrapper>
        <ZbtiHeader />
        <Question text="나의 1년 목표 수익률은?" />
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
          text="예금 금리만 넘기는 수준이라면 만족"
          onClick={handleAnswerClick}
        />
        <Answer
          text="위험을 감수했으니 50%도 기대할거야."
          onClick={handleAnswerClick}
        />
      </Wrapper>
    </PageTransition>
  );
}

export default Problem7;

const Wrapper = styled.div`
  .icon {
    width: 400px;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
`;
