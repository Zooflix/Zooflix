import React from "react";
import styled from "styled-components";

interface Subscription {
    subscribeName: String;
    subscribeTemperature: Number;
}

interface SubscriptionProps {
    onSubscribe: Subscription;
}

function MySubscription({ onSubscribe }: SubscriptionProps) {
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

export default MySubscription;

const Wrapper = styled.div`
    witdh: 330px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
`;

const LeftsideQuestion = styled.div`
  float: left,
  width: 50%;
  margin-top : 20px;
`;

const RightSideAnswer = styled.div`
  float: right,
  width: 50%;
  margin-top : 20px;
`;
