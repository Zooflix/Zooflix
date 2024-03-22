import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

function RouteToOtherPage() {
    const [userInfo, setUserInfo] = useState({});
    // const userNo = userInfo.userNo;  이후 작업

    const navigate = useNavigate();

    function handleClickToPortfolio() {
        navigate("/portfolio");
    }

    function handleClickToUpdateUser() {
        navigate("/user-update/{userNo}");
    }

    return (
        <Wrapper>
            <Container>
                <GoToPortfolio onClick={handleClickToPortfolio}>
                    내 포트폴리오 확인하기
                </GoToPortfolio>
                <GoToUpdateUser onClick={handleClickToUpdateUser}>
                    수정
                </GoToUpdateUser>
            </Container>
        </Wrapper>
    );
}

export default RouteToOtherPage;

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
