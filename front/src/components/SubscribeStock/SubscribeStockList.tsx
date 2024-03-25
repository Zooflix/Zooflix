import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SubscribeStockListItem from "./SubscribeStockListItem";

const SubscribeStockList: React.FC = () => {
  const [cards, setCards] = useState<
    {
      stockname: string;
      cardId: number;
      content: string;
    }[]
  >([]);
  return (
    <Wrapper>
      {cards.length > 0 ? (
        <Container>
          {cards.map((card, index) => (
            <SubscribeStockListItem key={index} card={card} />
          ))}
        </Container>
      ) : (
        <NoResultsMessage>구독 목록이 존재하지 않습니다.</NoResultsMessage>
      )}
    </Wrapper>
  );
};

export default SubscribeStockList;
const Wrapper = styled.div`
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  width: 1000px;
  height: 300px;
  border: none;
  border-radius: 30px;
  margin-bottom: 50px;
  padding: 0 30px;
`;
const NoResultsMessage = styled.div`
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
