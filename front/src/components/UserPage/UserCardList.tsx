import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../Mypage/Card";
import { getUserStockList } from "../../apis/api/UserPage";

interface Props {
  userPageInfo: any;
}

function SubscribeStockList({ userPageInfo }: Props) {
  const [userStockList, setUserStockList] = useState([]);

  async function getUserStockSubscribe() {
    try {
      const data = await getUserStockList(userPageInfo.userId);
      setUserStockList(data);
    } catch (error) {
      console.log("유저 주식 구독 목록 불러오기 실패");
      console.error(error);
    }
  }
  useEffect(() => {
    getUserStockSubscribe();
  }, []);

  if (!userStockList || userStockList.length === 0) {
    return (
      <NoResultsMessage>현재 정기 구독 중인 주식이 없습니다.</NoResultsMessage>
    );
  }

  return (
    <Wrapper>
      <Container>
        {userStockList.map((card, index) => (
          <Card key={index} card={card} cardIndex={index} />
        ))}
      </Container>
    </Wrapper>
  );
}

export default SubscribeStockList;
const Wrapper = styled.div``;
const NoResultsMessage = styled.div`
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
