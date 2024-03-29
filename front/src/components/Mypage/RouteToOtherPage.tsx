import { useNavigate } from "react-router";
import styled from "styled-components";

function RouteToOtherPage() {
  const navigate = useNavigate();

  function handleClickToPortfolio() {
    navigate("/portfolio");
  }

  function handleClickToUpdateUser() {
    navigate("/my-page/update");
  }

  return (
    <Container>
      <Button onClick={() => handleClickToPortfolio()}>
        내 포트폴리오 확인하기
      </Button>
      <Button onClick={() => handleClickToUpdateUser()}>수정</Button>
    </Container>
  );
}

export default RouteToOtherPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 50px 0;
`;

const Button = styled.button`
  font-size: 15px;
  font-weight: bold;
  padding: 10px;
  border: none;
  border-radius: 15px;
  background-color: #e7f1f5;
  color: #97adca;
  margin: 0 10px;
`;
