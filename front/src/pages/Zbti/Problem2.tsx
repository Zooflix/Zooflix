import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { zbtiQuestionState } from "../../Store/ZbtiState";

import PageTransition from "../../components/Zbti/PageTransition";
import ZbtiHeader from "../../components/Zbti/ZbtiHeader";
import Question from "../../components/Zbti/Question";
import Icon from "../../assets/img/ZbtiIcon/question2.svg";
import Answer from "../../components/Zbti/Answer";

function Problem2() {
  const navigate = useNavigate();
  const [zbtiValues, setZbtiValues] = useRecoilState(zbtiQuestionState);

  const handleAnswerClick = (answer: number) => {
    setZbtiValues([...zbtiValues, answer]);
    navigate("/problem3");
  };

  return (
    <PageTransition>
      <Wrapper>
        <ZbtiHeader backLink="/zbti" />
        <Container>
          <Question text="내가 처음으로 보유한 주식은?" />
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
            text="삼성전자, 테슬라와 같은 대형주"
            onClick={() => handleAnswerClick(1)}
          />
          <Answer
            text="스타트업, 강소기업 같은 성장주"
            onClick={() => handleAnswerClick(2)}
          />
        </Container>
      </Wrapper>
    </PageTransition>
  );
}

export default Problem2;

const Wrapper = styled.div`
  .icon {
    width: 400px;
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
