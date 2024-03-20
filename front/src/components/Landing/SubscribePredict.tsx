import React from "react";
import styled from "styled-components";
import img1 from "../../assets/img/landing/landing1.svg";

function SubscribePredict() {
  return (
    <LandingWrapper>
      <div>
        <h1>주식 예측 히스토리</h1>
        <p>
          히스토리로 보는 숨은 주식고수
          <br />
          따라서 투자까지!
        </p>
      </div>
      <div>
        <img src={img1} />
      </div>
    </LandingWrapper>
  );
}

export default SubscribePredict;

const LandingWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  div {
    margin-left: 100px;
  }
`;
