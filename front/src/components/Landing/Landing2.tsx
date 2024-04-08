import React from "react";
import styled from "styled-components";
import landing2 from "../../assets/img/landing/landing2.svg";

function Landing2() {
  return (
    <LandingWrapper>
      <div>
        <img
          src={landing2}
          alt="landing1"
          loading="lazy"
          decoding="async"
          width="670px"
        />
      </div>
      <Margin>
        <h1>주식 정기 구독</h1>
        <p>
          매달 적금대신
          <br />
          주식 구독 어떠신가요?
        </p>
      </Margin>
    </LandingWrapper>
  );
}

export default Landing2;

const LandingWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Margin = styled.div`
  margin-right: 150px;
`;
