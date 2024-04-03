import styled from "styled-components";
import { useRecoilState } from "recoil";
import UserCardList from "./UserCardList";
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

  return (
    <Wrapper>
      <LeftSide>
        <h3>{userPageInfo.userName} 님이 정기구독 중인 주식</h3>
        <CardSection>
          <UserCardList />
        </CardSection>
      </LeftSide>
      <RightSide>
        <h3>{userPageInfo.userName} 님이 구독 중인 회원</h3>
        {userPageSubscribeList.length === 0 ? (
          <NoSubscription>현재 구독 중인 회원이 없습니다.</NoSubscription>
        ) : (
          userPageSubscribeList.map((subscribe) => (
            <UserSubscription
              key={subscribe.subscribeNo}
              onSubscribe={subscribe}
            />
          ))
        )}
      </RightSide>
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
  padding: 10px;
  display: flex;
  flex-direction: row;
`;

const LeftSide = styled.div`
  width: 50%;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #e7e7e7;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin-right: 10px;
  height: 100%;
  h3 {
    text-align: center;
  }
  overflow: auto;
`;

const CardSection = styled.div`
  display: flex;
  justify-content: center;
  border: none;
`;
const RightSide = styled.div`
  width: 50%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  h3 {
    text-align: center;
  }
  height: 100%;
  border: 1px solid #e7e7e7;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  overflow: auto;
`;

const SubscriberList = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  padding-left: 30px;
`;

const SubscriberOne = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoSubscription = styled.p`
  text-align: center;
  color: gray;
`;
