import React from "react";
import styled from "styled-components";
import { deleteMySubscribe } from "../../apis/api/MyPage";

interface Subscription {
    subscribeNo: number;
    subscribeName: string;
    subscribeTemperature: number;
}

interface SubscriptionProps {
    onSubscribe: Subscription;
}

function UserSubscription({ onSubscribe }: SubscriptionProps) {
    return (
        <Wrapper>
                <div>{onSubscribe.subscribeName}</div>
                <Temp>{onSubscribe.subscribeTemperature + "°C"}</Temp>
        </Wrapper>
    );
}

export default UserSubscription;

const Wrapper = styled.div`
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    div {
        margin: 0 10px;
        font-weight: bold;
    }
`;

const Temp = styled.div`
  color: #0099e8;
  font-weight: bold;
`;

const Button = styled.button`
    margin-left: 10px;
    border: 0;
    background-color: transparent;
`;
