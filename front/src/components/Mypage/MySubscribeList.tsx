import styled from "styled-components";
import MySubscription from "./MySubscription";
import { useRecoilState } from "recoil";
import { myPageSubscribeListState } from "../../Store/MyPageState";
import CardList from "./CardList";
import MySubscribeStock from "../SubscribeStock/MySubscribeStock";

function MySubscribeList() {
  const [myPageSubscribeList, setMyPageSubScribeList] = useRecoilState(
    myPageSubscribeListState
  );

  const deleteSubscription = (subscribeNo: number) => {
    setMyPageSubScribeList(
      myPageSubscribeList.filter(
        (subscribe) => subscribe.subscribeNo !== subscribeNo
      )
    );
  };

  return (
    <Wrapper>
      <Container>
        <LeftSide>
          <h3>내가 정기 구독 중인 주식</h3>
          <CardSection>
            <MySubscribeStock />
          </CardSection>
        </LeftSide>
        <RightSide>
          <h3>내가 구독 중인 회원</h3>
          <div>
            {myPageSubscribeList &&
              myPageSubscribeList.map((subscribe) => (
                <MySubscription
                  key={subscribe.subscribeNo}
                  onSubscribe={subscribe}
                  onDelete={deleteSubscription}
                />
              ))}
          </div>
        </RightSide>
      </Container>
    </Wrapper>
  );
}

export default MySubscribeList;

const Wrapper = styled.div`
  background: #ffffff;
  border: 0.917219px solid #e7e7e7;
  box-shadow: 3.1002px 3.1002px 15.4918px -7.7505px rgba(0, 0, 0, 0.4);
  border-radius: 12.8411px;
  overflow: auto;
  max-height: 580px;
  scrollbar-color: #a5a5a5;
  scrollbar-width: thin;
  border: none;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  border: none;
`;

const LeftSide = styled.div`
  width: 50%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
`;

const CardSection = styled.div`
  border: none;
`;

const RightSide = styled.div`
  flex-direction: column;
`;
