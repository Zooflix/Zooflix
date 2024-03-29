import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { userPageInfoState } from "../../Store/UserPageState";
import { myPageInfoState } from "../../Store/MyPageState";
import { subscribeUser } from "../../apis/api/MyPage";

function SubscribeButton() {
    // 나의 userNo , 상대 유저의 userNo -> subscribeNo
    const [myPageInfo, setMyPageInfo] = useRecoilState(myPageInfoState);
    const [userPageInfo, setUserPageInfo] = useRecoilState(userPageInfoState);
    
    function handleClickToSubscribe() {
        subscribeUser(myPageInfo.userNo, userPageInfo.userNo);
        alert(userPageInfo.userName +" 님을 구독하셨습니다.");
    }

    return (
        <Wrapper>
            <Container>
                <GoToUpdateUser onClick={() => handleClickToSubscribe()}>
                    구독
                </GoToUpdateUser>
            </Container>
        </Wrapper>
    );
}

export default SubscribeButton;

const Wrapper = styled.div``;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

const GoToPortfolio = styled.div`
    font-family: "Noto Sans KR", "Noto Sans", sans-serif;
    font-size: 15px;
    font-weight: bold;
    padding: 10px;
`;

const GoToUpdateUser = styled.div`
    font-family: "Noto Sans KR", "Noto Sans", sans-serif;
    font-size: 15px;
    font-weight: bold;
    padding: 10px;
`;
