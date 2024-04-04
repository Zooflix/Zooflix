import styled from "styled-components";

type StartTestProps = {
  text: string;
  onClick?: () => void;
};

function Answer({ text, onClick }: StartTestProps) {
  return (
    <Wrapper onClick={onClick}>
      <StartBox>
        <h3>{text}</h3>
      </StartBox>
    </Wrapper>
  );
}

export default Answer;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
//   margin: 15px 0;
`;

const StartBox = styled.div`
  width: 300px;
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