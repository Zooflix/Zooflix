import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import PageTransition from "../../components/Zbti/PageTransition";
import ZbtiHeader from "../../components/Zbti/ZbtiHeader";
import Question from "../../components/Zbti/Question";
import Icon from "../../assets/img/ZbtiIcon/question3.svg";
import Answer from "../../components/Zbti/Answer";

function Problem3() {
  const navigate = useNavigate();

  const handleAnswerClick = () => {
    navigate("/problem4");
  };

  return (
    <PageTransition>
      <Wrapper>
        <ZbtiHeader />
        <Question text="주식이 급등해서 10%의 수익을 얻는다면?" />
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
          text="미래가 중요해.. 나는 존버할래.."
          onClick={handleAnswerClick}
        />
        <Answer
          text="현재가 제일 중요하지. 바로 익절하고 지금 가자!"
          onClick={handleAnswerClick}
        />
      </Wrapper>
    </PageTransition>
  );
}

export default Problem3;

const Wrapper = styled.div`
  .icon {
    width: 400px;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
`;
