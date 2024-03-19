import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import PageTransition from "../../components/Zbti/PageTransition";

import ZbtiHeader from "../../components/Zbti/ZbtiHeader";
import Question from "../../components/Zbti/Question";
import Icon from "../../assets/img/ZbtiIcon/question4.svg";
import Answer from "../../components/Zbti/Answer";

function Problem4() {
  const navigate = useNavigate();

  const handleAnswerClick = () => {
    navigate("/problem5");
  };
  return (
    <PageTransition>
      <Wrapper>
        <ZbtiHeader />
        <Question text="100만원이 입금됐다. 웬걸? 어떻게 투자할 것인가?" />
        <ImgContainer>
          <img
            src={Icon}
            alt="icon"
            className="icon"
            loading="lazy"
            decoding="async"
          />
        </ImgContainer>
        <Answer text="10만원씩 분산투자해야지" onClick={handleAnswerClick} />
        <Answer
          text="인생은 한방. 100만원쯤은 한방으로"
          onClick={handleAnswerClick}
        />
      </Wrapper>
    </PageTransition>
  );
}

export default Problem4;

const Wrapper = styled.div`
  .icon {
    width: 400px;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
`;
