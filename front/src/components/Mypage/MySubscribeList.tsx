import styled from "styled-components";
import DeleteSubButton from "./DeleteSubButton";
import { useRecoilState } from "recoil";
import { myPageSubscribeListState } from "../../Store/MyPageState";
import MySubscribeStock from "../SubscribeStock/MySubscribeStock";
import CardList from "./CardList";

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
      <LeftSide>
        <Title>
          <h3>내가 정기 구독 중인 주식</h3>
        </Title>

        <CardSection>
          <CardList />
        </CardSection>
      </LeftSide>
      <RightSide>
        <h3>내가 구독 중인 회원</h3>
        {myPageSubscribeList.length === 0 ? (
          <NoSubscription>현재 구독 중인 사용자가 없습니다.</NoSubscription>
        ) : (
          myPageSubscribeList.map((subscribe) => (
            <SubscriberOne key={subscribe.subscribeNo}>
              <DeleteSubButton
                onSubscribe={subscribe}
                onDelete={deleteSubscription}
                text={"구독 취소"}
              />
            </SubscriberOne>
          ))
        )}
      </RightSide>
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
  display: flex;
  flex-direction: row;
  padding: 10px;
`;

const LeftSide = styled.div`
  width: 50%;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #e7e7e7;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  h3 {
    text-align: center;
  }
  margin-right: 10px;
  height: 100%;
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
  border: 1px solid #e7e7e7;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  h3 {
    text-align: center;
  }
  overflow: auto;
`;

const SubscriberOne = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px;
  //   box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
`;

const NoSubscription = styled.p`
  text-align: center;
  color: gray;
`;

const Title = styled.div``;
