import styled from "styled-components";

import SubscribeForm from "../../components/SubscribeStock/SubscribeForm";
import { useRecoilState } from "recoil";
import { userNameState } from "../../Store/UserState";
import MySubscribeStock from "../../components/SubscribeStock/MySubscribeStock";
import { getJwtUserId } from "../../apis/utils/jwt";

function SubscribeStock() {
  const [userName, setUserName] = useRecoilState(userNameState);
  return (
    <Wrapper>
      <SubscribeContainer>
        <Title>주식 정기 구독하기</Title>
        <SubscribeForm />
      </SubscribeContainer>
      <SubscribeContainer>
        <Title>{getJwtUserId()}님이 구독중인 주식 목록</Title>
        <MySubscribeStock />
      </SubscribeContainer>
    </Wrapper>
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
  font-size: 23px;
  font-weight: 1000;
  margin-bottom: 20px;
  text-align: center;
`;
