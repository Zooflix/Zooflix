import styled from "styled-components";

interface InputProps {
  text: string;
  placeholder: string;
}

function SubscribeDateInput(props: InputProps) {
  return (
    <Wrapper>
      <label>{props.text}</label>
      <InputContainer>
        매월 <input type="number" placeholder={props.placeholder} />
        일에 구독을 신청합니다.
      </InputContainer>
    </Wrapper>
  );
}

export default SubscribeDateInput;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  label {
    padding-top: 20px;
    margin-right: 30px;
    font-weight: bold;
  }
`;

const InputContainer = styled.div`
  border: solid 1px;
  border-radius: 15px;
  margin: 10px 0;
  font-weight: bold;
  padding: 0 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: none;
  background-color: white;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  margin-right: 30px;
  font-size: 13px;

  input {
    border: none;
    margin-left: 10px;
    height: 40px;
    width: 80px;
  }

  input:focus {
    outline: none;
  }
`;