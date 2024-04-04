import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { zbtiQuestionState } from "../../Store/ZbtiState";

import PageTransition from "../../components/Zbti/PageTransition";
import ZbtiHeader from "../../components/Zbti/ZbtiHeader";
import Question from "../../components/Zbti/Question";
import Icon from "../../assets/img/ZbtiIcon/question5.svg";
import Answer from "../../components/Zbti/Answer";

function Problem5() {
  const navigate = useNavigate();
  const [zbtiValues, setZbtiValues] = useRecoilState(zbtiQuestionState);

  const handleAnswerClick = (answer: number) => {
    setZbtiValues([...zbtiValues, answer]);
    navigate("/problem6");
  };
  return (
    <PageTransition>
      <Wrapper>
        <ZbtiHeader backLink="/zbti" />
        <Container>
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
            onClick={() => handleAnswerClick(1)}
          />
          <Answer
            text="아니야. 꿈은 꿈일뿐 정보를 더 찾아보자"
            onClick={() => handleAnswerClick(2)}
          />
        </Container>
      </Wrapper>
    </PageTransition>
  );
}

export default Problem5;

const Wrapper = styled.div`
  .icon {
    width: 370px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0 30px;
  max-height: 350px;
`;
