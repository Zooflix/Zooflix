import React from "react";
import styled from "styled-components";
import landing3 from "../../assets/img/landing/landing3.svg";

function Landing3() {
  return (
    <LandingWrapper>
      <Margin>
        <h1>투자 성향 분석 포트폴리오</h1>
        <p>
          나도 모르던 나의 투자성향
          <br />
          분석해드려요!
        </p>
      </Margin>
      <div>
        <img src={landing3} alt="landing1" loading="lazy" decoding="async" />
      </div>
    </LandingWrapper>
  );
}

export default Landing3;

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
