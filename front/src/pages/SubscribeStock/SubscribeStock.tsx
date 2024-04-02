import styled from "styled-components";

import SubscribeForm from "../../components/SubscribeStock/SubscribeForm";
import MySubscribeStock from "../../components/SubscribeStock/MySubscribeStock";
import { getJwtUserName } from "../../apis/utils/jwt";
import CommonPageTransition from "../../components/Common/CommonPageTransition";
import { loginCheck } from "../../components/User/IsLoginCheck";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SubscribeStock() {
  const [isLogin, setIsLogin] = useState(loginCheck());
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      alert("로그인이 필요한 페이지입니다.");
      navigate("/login");
    } else {
      setName(getJwtUserName());
    }
  }, []);

  return (
    <CommonPageTransition>
      <Wrapper>
        <SubscribeContainer>
          <Title>주식 정기 구독하기</Title>
          <SubscribeForm />
        </SubscribeContainer>
        <SubscribeContainer>
          <Title>{name}님이 구독중인 주식 목록</Title>
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
