import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface Subscription {
  subscribeNo: number;
  subscribeName: string;
  subscribeTemperature: number;
  subscribeUserNo: number;
}

interface SubscriptionProps {
  onSubscribe: Subscription;
}

function UserSubscription({ onSubscribe }: SubscriptionProps) {
  const Navigate = useNavigate();

  function toUserPage() {
    Navigate(`/user-page/${onSubscribe.subscribeUserNo}`);
  }

  return (
    <Wrapper onClick={toUserPage}>
      <UserName>{onSubscribe.subscribeName}</UserName>
      <Temp>{onSubscribe.subscribeTemperature + "°C"}</Temp>
    </Wrapper>
  );
}

export default UserSubscription;

const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  width: 70%;
  padding: 10px;
  border-radius: 20px;
  &:hover {
    scale: 1.05;
  }
  margin: 10px;
  cursor: pointer;
`;

const Temp = styled.div`
  color: #0099e8;
  font-weight: bold;
`;

const UserName = styled.div`
  width: 170px;
  margin-left: 20px;
`;
