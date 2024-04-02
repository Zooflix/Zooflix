import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function GetIssued() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const url =
      "https://apiportal.koreainvestment.com/apiservice/oauth2#L_5c87ba63-740a-4166-93ac-803510bb9c02";
    window.open(url, "_blank", "noopener, noreferrer");
  };

  return (
    <Wrapper>
      <Text>APP 키가 없으신가요?</Text>
      <Button onClick={handleButtonClick}>발급받기</Button>
    </Wrapper>
  );
}

export default GetIssued;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
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
  height: 25px;
  padding: 0 10px;

  &:hover {
    background-color: #fff;
    color: #1e3659;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  }
`;
