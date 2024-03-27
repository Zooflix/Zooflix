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
    onDelete: (subscribeNo: number) => void;
}

function MySubscription({ onSubscribe, onDelete }: SubscriptionProps) {
    const deleteSubscription = (subscribeNo: number) => {
        const isConfirmed = window.confirm("글을 삭제하시겠습니까?");
        if (!isConfirmed) {
            return;
        }
        try {
            deleteMySubscribe(subscribeNo);
            onDelete(subscribeNo);
        } catch (error) {
            console.log("deleteSubscription error : " + error);
        }
    };

    return (
        <Wrapper>
            <LeftsideQuestion>
                <div>{onSubscribe.subscribeName}</div>
            </LeftsideQuestion>
            <RightSideAnswer>
                <div>{onSubscribe.subscribeTemperature + "°C"}</div>
                <Button
                    onClick={() => deleteSubscription(onSubscribe.subscribeNo)}
                >
                    X
                </Button>
            </RightSideAnswer>
        </Wrapper>
    );
}

export default MySubscription;

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