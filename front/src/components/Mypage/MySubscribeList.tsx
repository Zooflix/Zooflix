import styled from "styled-components";
import DeleteSubButton from "./DeleteSubButton";
import { useRecoilState } from "recoil";
import { myPageSubscribeListState } from "../../Store/MyPageState";
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
          {myPageSubscribeList.length > 0 ? (
            <SubscriberList>
              {myPageSubscribeList.map((subscribe) => (
                <SubscriberOne key={subscribe.subscribeNo}>
                  <DeleteSubButton
                    onSubscribe={subscribe}
                    onDelete={deleteSubscription}
                    text={"X"}
                  />
                </SubscriberOne>
              ))}
            </SubscriberList>
          ) : (
            <NoSubscription>구독하는 회원이 없습니다.</NoSubscription>
          )}
        </RightSide>
      </Container>
    </Wrapper>
  );
}

export default MySubscribeList;

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

const SubscriberList = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

const SubscriberOne = styled.div``;

const NoSubscription = styled.h3`
  text-align: center;
`;
