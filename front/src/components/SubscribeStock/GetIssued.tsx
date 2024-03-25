// 발급받기

import styled from "styled-components";
import SquareBtn from "../Common/SquareBtn";

function GetIssued() {
  return (
    <Wrapper>
      <Text>APP 키가 없으신가요?</Text>
      <Button>발급받기</Button>
    </Wrapper>
  );
}

export default GetIssued;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 30px;
`;

const Text = styled.div`
  color: #939393;
  margin-right: 10px;
  font-size: 13px;
  font-weight: bold;
`;

const Button = styled.button`
  border: none;
  border-radius: 15px;
  background-color: #1e3659;
  color: white;
  font-weight: bold;
  height: 40px;
  padding: 0 10px;

  &:hover {
    background-color: #fff;
    color: #1e3659;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  }
`;
