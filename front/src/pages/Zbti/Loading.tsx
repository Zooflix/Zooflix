import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router";
import React, { useEffect } from "react";

// 컴포넌트
import Character from "../../components/Character/Character3d";

function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/result");
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Wrapper>
      <h1>분석중</h1>
      <Container>
        <div>
          <Character
            name="Unicorn"
            characterScale={0.25}
            canvasWidth={250}
            canvasHeight={300}
            action="none"
          />
        </div>
        <div>
          <Character
            name="Lion"
            characterScale={0.25}
            canvasWidth={250}
            canvasHeight={300}
            action="none"
          />
        </div>
        <div>
          <Character
            name="Sloth"
            characterScale={0.25}
            canvasWidth={250}
            canvasHeight={300}
            action="none"
          />
        </div>
        <div>
          <Character
            name="Cow"
            characterScale={0.25}
            canvasWidth={250}
            canvasHeight={300}
            action="none"
          />
        </div>
      </Container>
    </Wrapper>
  );
}

export default Loading;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-family: WAGURITTF;
    font-size: 50px;
    font-weight: lighter;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 700px;
  position: relative;
  justify-content: space-between;

  div {
    position: relative;
    top: 20px;
    display: inline-block;
    animation: bounce 0.7s ease alternate;
    font-size: 50px;
    color: #0d274d;
  }

  div :nth-child(2) {
    animation-delay: 0.1s;
  }
  div :nth-child(3) {
    animation-delay: 0.2s;
  }
  div :nth-child(4) {
    animation-delay: 0.3s;
  }
  div :nth-child(5) {
    animation-delay: 0.4s;
  }

  @keyframes bounce {
    100% {
      top: -20px;
      text-shadow: 0 1px 0 #ccc, 0 2px 0 #ccc, 0 3px 0 #ccc, 0 4px 0 #ccc,
        0 5px 0 #ccc, 0 6px 0 #ccc, 0 7px 0 #ccc, 0 8px 0 #ccc, 0 9px 0 #ccc,
        0 50px 25px rgba(0, 0, 0, 0.2);
    }
  }
`;
