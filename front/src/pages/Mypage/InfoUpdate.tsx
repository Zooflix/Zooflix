import styled from "styled-components";
import UpdateMyInfo from "../../components/Mypage/UpdateMyInfo";

function InfoUpdate() {
  return (
    <Wrapper>
      <UpdateMyInfo />
    </Wrapper>
  );
}

export default InfoUpdate;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 150px;
  h2 {
    color: #2a4263;
  }
`;
