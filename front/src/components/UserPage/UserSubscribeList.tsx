import styled from "styled-components";
import { useRecoilState } from "recoil";
import CardList from "./UserCardList";
import { userPageInfoState, userPageSubscribeListState } from "../../Store/UserPageState";
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
          <div>
            {userPageSubscribeList &&
              userPageSubscribeList.map((subscribe) => (
                <UserSubscription
                  key={subscribe.subscribeNo}
                  onSubscribe={subscribe}
                />
              ))}
          </div>
        </RightSide>
      </Container>
    </Wrapper>
  );
}

export default UserSubscribeList;

const Wrapper = styled.div`
  //   margin: 10px;
  background: #ffffff;
  border: 0.917219px solid #e7e7e7;
  box-shadow: 3.1002px 3.1002px 15.4918px -7.7505px rgba(0, 0, 0, 0.4);
  border-radius: 12.8411px;
  overflow: auto;
  max-height: 580px;
  scrollbar-color: #a5a5a5;
  scrollbar-width: thin;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
`;

const LeftSide = styled.div`
  width: 50%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardSection = styled.div``;

const RightSide = styled.div`
  //   width: 330px;
  flex-direction: column;
`;
