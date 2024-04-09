import styled from "styled-components";
import UserCardList from "./UserCardList";
import UserSubscription from "./UserSubscription";
import { useEffect, useState } from "react";
import { getUserSubscribeList } from "../../apis/api/UserPage";

interface Props {
  userPageInfo: any;
}

function UserSubscribeList({ userPageInfo }: Props) {
  const [userPageSubscribeList, setUserPageSubscribeList] = useState([]);

  async function getUserSubscribe() {
    try {
      const data = await getUserSubscribeList(userPageInfo.userNo);
      setUserPageSubscribeList(data);
      console.log(" getUserSubscribe ", data);
    } catch (error) {
      console.log("유저 구독한 사람 목록 불러오기 실패");
      console.error(error);
    }
  }

  useEffect(() => {
    getUserSubscribe();
  }, [userPageInfo]);

  return (
    <Wrapper>
      <LeftSide>
        <h3>{userPageInfo.userName} 님이 정기구독 중인 주식</h3>
        <CardSection>
          <UserCardList userPageInfo={userPageInfo} />
        </CardSection>
      </LeftSide>
      <RightSide>
        <h3>{userPageInfo.userName} 님이 구독 중인 회원</h3>
        {userPageSubscribeList.length === 0 ? (
          <NoSubscription>현재 구독 중인 회원이 없습니다.</NoSubscription>
        ) : (
          userPageSubscribeList.map((subscribe, index) => (
            <UserSubscription key={index} onSubscribe={subscribe} />
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

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CardSection = styled.div`
  display: flex;
  justify-content: center;
  border: none;
`;
const RightSide = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    text-align: center;
  }
  height: 100%;
  border: 1px solid #e7e7e7;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NoSubscription = styled.p`
  text-align: center;
  color: gray;
`;
