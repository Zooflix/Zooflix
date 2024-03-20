import styled from "styled-components";

function FlowBar() {
  return (
    <Wrapper>
      <ScrollText>
        <Track>
          <p>코스피</p>
          <p>코스닥</p>
          <p>코스피</p>
          <p>코스피</p>
          <p>코스피</p>
        </Track>
      </ScrollText>
    </Wrapper>
  );
}

export default FlowBar;

const Wrapper = styled.div`
  @keyframes scroll-animation {
    0% {
      left: 0;
    }
    100% {
      left: -400px;
    }
  }
`;
const ScrollText = styled.div`
  width: 100%;
  overflow: hidden;
`;
const Track = styled.div`
  display: flex;
  position: relative;
  width: 2800px;
  animation: scroll-animation 5s linear infinite;

  p {
    width: 400px;
    font-size: 36px;
  }
`;
