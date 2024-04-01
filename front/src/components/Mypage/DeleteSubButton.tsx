import styled from "styled-components";
import { deleteMySubscribe } from "../../apis/api/MyPage";

interface Subscription {
    subscribeNo: number;
    subscribeName: string;
    subscribeTemperature: number;
}

interface SubscriptionProps {
    text: String;
    onSubscribe: Subscription;
    onDelete: (subscribeNo: number) => void;
}

function DeleteSubButton({ text, onSubscribe, onDelete }: SubscriptionProps) {
    const deleteSubscription = (subscribeNo: number) => {
        const isConfirmed = window.confirm("구독을 취소하시겠습니까?");
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
                    {text}
                </Button>
            </RightSideAnswer>
        </Wrapper>
    );
}

export default DeleteSubButton;

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
