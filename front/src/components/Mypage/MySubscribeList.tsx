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
          <div>
            {myPageSubscribeList &&
              myPageSubscribeList.map((subscribe) => (
                <DeleteSubButton
                  key={subscribe.subscribeNo}
                  onSubscribe={subscribe}
                  onDelete={deleteSubscription}
                  text={"X"}
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
  border: 1px solid #e7e7e7;
  border-radius: 12px;
  overflow: auto;
  max-height: 580px;
  border: none;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LeftSide = styled.div`
  // width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  h3 {
    text-align: center;
  }
`;

const CardSection = styled.div`
  border: none;
`;

const RightSide = styled.div`
  flex-direction: column;
  justify-content: center;
  h3 {
    text-align: center;
  }
`;
