import { useRecoilState } from "recoil";
import styled from "styled-components";
import { userPageInfoState, userPagePredictListState } from "../../Store/UserPageState";

function UserInfo() {
    const [userPageInfo, setUserPageInfo] = useRecoilState(userPageInfoState);

    return (
        <Wrapper>
            <LeftsideQuestion>
                <h4>총 예측 횟수</h4>
                <h4>예측 성공 횟수</h4>
                <h4>예측률</h4>
                <h4>구독</h4>
                <h4>구독자</h4>
            </LeftsideQuestion>
            <RightSideAnswer>
                <h4>{userPageInfo.predictCount}</h4>
                <h4>{userPageInfo.successCount}</h4>
                <h4>{userPageInfo.predictionRate} %</h4>
                <h4>{userPageInfo.subscribeFromMe}</h4>
                <h4>{userPageInfo.subscribeToMe}</h4>
            </RightSideAnswer>
        </Wrapper>
    );
}

export default UserInfo;

const Wrapper = styled.div`
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding: 5px 70px;
`;

const LeftsideQuestion = styled.div``;

const RightSideAnswer = styled.div``;
