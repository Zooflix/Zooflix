import styled from "styled-components";
import { subscribeUser } from "../../apis/api/MyPage";

interface SubscribeButtonProps {
    userNo: number; // 유저 번호
    subscribeNo: number; // 구독할 유저의 번호
}

function SubscribeButton({ userNo, subscribeNo }: SubscribeButtonProps) {
    function handleClickToSubscribe() {
        subscribeUser(userNo, subscribeNo);
        alert("구독 완료");
        window.location.reload();
    }

    return (
        <Wrapper>
            <GoToUpdateUser onClick={() => handleClickToSubscribe()}>
                구독
            </GoToUpdateUser>
        </Wrapper>
    );
}

export default SubscribeButton;

const Wrapper = styled.div`
    padding: 50px 0;
`;

const GoToUpdateUser = styled.button`
    background-color: #f84646;
    width: 90px;
    border-radius: 10px;
    cursor: pointer;
    padding: 15px 0;
    border: none;
    color: white;
    &:hover {
        background-color: white;
        box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
        color: #f84646;
        font-weight: bold;
    }
`;
