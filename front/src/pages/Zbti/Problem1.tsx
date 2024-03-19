import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import PageTransition from "../../components/Zbti/PageTransition";
import ZbtiHeader from "../../components/Zbti/ZbtiHeader";
import Question from "../../components/Zbti/Question";
import Icon from "../../assets/img/ZbtiIcon/question1.svg";
import Answer from "../../components/Zbti/Answer";

function Problem1() {
  const navigate = useNavigate();

  const handleAnswerClick = () => {
    navigate("/problem2");
  };

  return (
    <PageTransition>
      <Wrapper>
        <ZbtiHeader />
        <Question text="주식 투자를 시작해보려고 한다. 얼마까지 투자 가능한가?" />
        <ImgContainer>
          <img src={Icon} alt="icon" className="icon" />
        </ImgContainer>
        <Answer text="마이너스 통장까지 풀베팅!" onClick={handleAnswerClick} />
        <Answer
          text="일단 삼성전자 한 주부터 조심조심"
          onClick={handleAnswerClick}
        />
      </Wrapper>
    </PageTransition>
  );
}

export default Problem1;

const Wrapper = styled.div`
  .icon {
    width: 400px;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
`;
