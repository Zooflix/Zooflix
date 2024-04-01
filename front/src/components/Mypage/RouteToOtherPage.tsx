import { useNavigate } from "react-router";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { myPageInfoState } from "../../Store/MyPageState";

function RouteToOtherPage() {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(myPageInfoState);

  function handleClickToPortfolio() {
    if (userInfo.userZbti === "Bear") {
      return (
        <div>
          현재 ZBTI 테스트를 진행하지 않았습니다. 테스트 이후에 포트폴리오
          확인할 수 있습니다.
        </div>
      );
    } else {
      navigate("/result");
    }
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
