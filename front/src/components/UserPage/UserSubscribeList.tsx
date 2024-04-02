import styled from "styled-components";
import { useRecoilState } from "recoil";
import CardList from "./UserCardList";
import {
    userPageInfoState,
    userPageSubscribeListState,
} from "../../Store/UserPageState";
import UserSubscription from "./UserSubscription";

function UserSubscribeList() {
    const [userPageInfo, setUserPageInfo] = useRecoilState(userPageInfoState);

    const [userPageSubscribeList, setUserPageSubScribeList] = useRecoilState(
        userPageSubscribeListState
    );

    const deleteSubscription = (subscribeNo: number) => {
        setUserPageSubScribeList(
            userPageSubscribeList.filter(
                (subscribe) => subscribe.subscribeNo !== subscribeNo
            )
        );
    };

    return (
        <Wrapper>
            <Container>
                <LeftSide>
                    <h3>{userPageInfo.userName} 님이 정기구독 중인 주식</h3>
                    <CardSection>
                        <CardList />
                    </CardSection>
                </LeftSide>
                <RightSide>
                    <h3>{userPageInfo.userName} 님이 구독 중인 회원</h3>
                    {userPageSubscribeList &&
                        userPageSubscribeList.map((subscribe) => (
                            <UserSubscription
                                key={subscribe.subscribeNo}
                                onSubscribe={subscribe}
                            />
                        ))}
                </RightSide>    
            </Container>
        </Wrapper>
    );
}

export default UserSubscribeList;

const Wrapper = styled.div`
    background: #ffffff;
    border: 1px solid #e7e7e7;
    border-radius: 12px;
    width: 100%;
    border: none;
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
`;

const LeftSide = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: none;
    h3 {
        text-align: center;
    }
`;

const CardSection = styled.div`
    display: flex;
    justify-content: center;
    border: none;
`;
const RightSide = styled.div`
    width: 50%;
    flex-direction: column;
    justify-content: center;
    h3 {
        text-align: center;
    }
`;
