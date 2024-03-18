import styled from "styled-components";
import background from "../../assets/background/login-background1.svg";

function UserBackground() {
  return (
    <Wrapper>
      <img src={background} className="back" alt="background" />
    </Wrapper>
  );
}

export default UserBackground;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  .back {
    position: absolute;
    top: 0;
    left: 0;
  }
`;
