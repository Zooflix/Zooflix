import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { userPageInfoState } from "../../Store/UserPageState";
import { myPageInfoState } from "../../Store/MyPageState";
import { subscribeUser } from "../../apis/api/MyPage";

interface SubscribeButtonProps {
    userNo: number; // 유저 번호
    subscribeNo: number; // 구독할 유저의 번호
}

function SubscribeButton({ userNo, subscribeNo }: SubscribeButtonProps) {
    // 나의 userNo , 상대 유저의 userNo -> subscribeNo
    const [myPageInfo, setMyPageInfo] = useRecoilState(myPageInfoState);
    const [userPageInfo, setUserPageInfo] = useRecoilState(userPageInfoState);

    function handleClickToSubscribe() {
        subscribeUser(userNo, subscribeNo);
        alert("구독 완료");
    }

    return (
        <GoToUpdateUser onClick={() => handleClickToSubscribe()}>
            구독
        </GoToUpdateUser>
    );
}

export default SubscribeButton;

const Wrapper = styled.div``;

const GoToUpdateUser = styled.button`
    background-color: #f84646;
    width: 90px;
    border-radius: 10px;
    cursor: pointer;
    padding: 7px 0;
    border: none;
    color: white;
    &:hover {
        background-color: white;
        box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
        color: #f84646;
        font-weight: bold;
    }
`;
