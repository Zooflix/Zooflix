import styled from "styled-components";

type AnswerProps = {
  text: string;
  onClick?: () => void;
};

function Answer({ text, onClick }: AnswerProps) {
  return (
    <Wrapper onClick={onClick}>
      <AnswerBox>
        <h3>{text}</h3>
      </AnswerBox>
    </Wrapper>
  );
}

export default Answer;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px 0;
`;

const AnswerBox = styled.div`
  width: 500px;
  border: none;
  border-radius: 20px;
  background-color: black;
  h3 {
    color: white;
    text-align: center;
  }
  &:hover {
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    h3 {
      color: black;
    }
  }
`;
