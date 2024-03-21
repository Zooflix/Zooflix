import React from "react";
import styled from "styled-components";
import img1 from "../../assets/img/landing/landing1.svg";

function Landing1() {
  return (
    <LandingWrapper>
      <Margin>
        <h1>주식 예측 히스토리</h1>
        <p>
          히스토리로 보는 숨은 주식고수
          <br />
          따라서 투자까지!
        </p>
      </Margin>
      <div>
        <img src={img1} alt="landing1" loading="lazy" decoding="async" />
      </div>
    </LandingWrapper>
  );
}

export default Landing1;

const LandingWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Margin = styled.div`
  margin-left: 150px;
`;
