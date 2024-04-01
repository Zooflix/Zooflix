import styled from "styled-components";

import SubscribeForm from "../../components/SubscribeStock/SubscribeForm";
import MySubscribeStock from "../../components/SubscribeStock/MySubscribeStock";
import { getJwtUserName } from "../../apis/utils/jwt";
import CommonPageTransition from "../../components/Common/CommonPageTransition";

function SubscribeStock() {
  return (
    <CommonPageTransition>
      <Wrapper>
        <SubscribeContainer>
          <Title>주식 정기 구독하기</Title>
          <SubscribeForm />
        </SubscribeContainer>
        <SubscribeContainer>
          <Title>{getJwtUserName()}님이 구독중인 주식 목록</Title>
          <MySubscribeStock />
        </SubscribeContainer>
      </Wrapper>
    </CommonPageTransition>
  );
}

export default SubscribeStock;

const Wrapper = styled.div`
  margin-left: 6vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SubscribeContainer = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: left;
`;
