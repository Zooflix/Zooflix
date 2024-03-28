import styled from "styled-components";

type QuestionProps = {
  text: string;
};

function Question(props: QuestionProps) {
  return (
    <Wrapper>
      <h1>{props.text}</h1>
    </Wrapper>
  );
}

export default Question;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  text-aligns: center;
  h1 {
    color: #0d274d;
    font-family: WAGURITTF;
    font-weight: lighter;
    font-size: 50px;
  }
`;
