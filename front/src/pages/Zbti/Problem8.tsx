import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import PageTransition from "../../components/Zbti/PageTransition";
import ZbtiHeader from "../../components/Zbti/ZbtiHeader";
import Question from "../../components/Zbti/Question";
import Icon from "../../assets/img/ZbtiIcon/question8.svg";
import Answer from "../../components/Zbti/Answer";

function Problem8() {
  const navigate = useNavigate();

  const handleAnswerClick = () => {
    navigate("/problem2");
  };
  return (
    <PageTransition>
      <Wrapper>
        <ZbtiHeader />
        <Question text="이럴 리 없어. 내 주식이 모두 하락하고 있다. 당신의 선택은?" />
        <ImgContainer>
          <img src={Icon} alt="icon" className="icon" />
        </ImgContainer>
        <Answer
          text="안된다면 자식한테 물려주지. 믿고 기다리자."
          onClick={handleAnswerClick}
        />
        <Answer
          text="내 생각이 시장과 다르면 오늘이라도 파는게 맞아."
          onClick={handleAnswerClick}
        />
      </Wrapper>
    </PageTransition>
  );
}

export default Problem8;

const Wrapper = styled.div`
  .icon {
    width: 400px;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
`;
