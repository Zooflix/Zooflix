import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { stockSubListState } from "../../Store/StockSubscribeState";
import { useRecoilState } from "recoil";

const CardList: React.FC = () => {
  const [myStockList] = useRecoilState(stockSubListState);

  if (!myStockList || myStockList.length === 0) {
    return (
      <NoResultsMessage>현재 정기 구독 중인 주식이 없습니다.</NoResultsMessage>
    );
  }

  return (
    <Wrapper>
      <Container>
        {myStockList.map((card, index) => (
          <Card key={index} card={card} cardIndex={index} />
        ))}
      </Container>
    </Wrapper>
  );
};

export default CardList;
const Wrapper = styled.div``;

const NoResultsMessage = styled.div`
  color: gray;
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
