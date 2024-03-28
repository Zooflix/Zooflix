import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { useRecoilState } from "recoil";
import { stockSubListState } from "../../Store/StockSubscribeState";

const SubscribeStockList: React.FC = () => {
  const [myStockList, setMyStockList] = useRecoilState(stockSubListState);

  if (!myStockList || myStockList.length === 0) {
    return <NoResultsMessage>결과를 찾을 수 없습니다</NoResultsMessage>;
  }

  return (
    <Wrapper>
      <Container>
        {myStockList.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </Container>
    </Wrapper>
  );
};

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
