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
            <LeftsideQuestion>
                <div>{onSubscribe.subscribeName}</div>
            </LeftsideQuestion>
            <RightSideAnswer>
                <div>{onSubscribe.subscribeTemperature + "°C"}</div>
            </RightSideAnswer>
        </Wrapper>
    );
}

export default UserSubscription;

const Wrapper = styled.div`
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
`;

const LeftsideQuestion = styled.div`
    float: left;
    width: 50%;
    margin-top: 20px;
`;

const RightSideAnswer = styled.div`
    float: right;
    width: 50%;
    margin-top: 20px;
    display: flex;
    flex-direction: row;

    btn {
        margin-left: 100px;
    }
`;

const Button = styled.button`
    margin-left: 10px;
    border: 0;
    background-color: transparent;
`;