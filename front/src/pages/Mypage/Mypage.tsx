import styled from "styled-components";
import HeaderLogo from "../../assets/img/Logo.svg";

function Mypage() {
  return (
    <Wrapper>
      <Container>
        <img src={HeaderLogo} className="header" alt="HeaderLogo"/>
      </Container>
    </Wrapper>
  )
}

export default Mypage;

const Wrapper = styled.div``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;