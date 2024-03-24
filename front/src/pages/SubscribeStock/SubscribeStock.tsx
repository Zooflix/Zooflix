import styled from "styled-components";

import Title from "../../components/Common/Title";
import SubscribeForm from "../../components/SubscribeStock/SubscribeForm";
import SubscribeStockList from "../../components/SubscribeStock/SubscribeStockList";

function SubscribeStock() {
  return (
    <Wrapper>
      <SubscribeContainer>
        <Title text="주식 정기 구독하기" />
        <SubscribeForm />
      </SubscribeContainer>
      <SubscribeContainer>
        <Title text="행복한 원숭이 님이 구독 중인 주식 목록" />
      </SubscribeContainer>
    </Wrapper>
  );
}

export default SubscribeStock;

const Wrapper = styled.div`
  padding-left: 200px;
  display: flex;
  flex-direction: column;
`;

const SubscribeContainer = styled.div`
  margin-bottom: 50px;
`;
