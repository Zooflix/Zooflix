import styled from "styled-components";

import Title from "../../components/Common/Title";
import SubscribeForm from "../../components/SubscribeStock/SubscribeForm";

function SubscribeStock() {
  return (
    <Wrapper>
      <Title text="주식 정기 구독하기" />
      <SubscribeForm />
    </Wrapper>
  );
}

export default SubscribeStock;

const Wrapper = styled.div`
  padding-left: 200px;
  display: flex;
  flex-direction: column;
`;
