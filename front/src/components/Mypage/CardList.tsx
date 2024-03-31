import React from "react";
import styled from "styled-components";
import Card from "./Card";

interface Props {
  myStockList: any[];
}

function CardList({ myStockList }: Props) {
  return (
    <Wrapper>
      <Container>
        {myStockList.map((card, index) => (
          <Card key={index} card={card} cardIndex={index} />
        ))}
      </Container>
    </Wrapper>
  );
}

export default CardList;
const Wrapper = styled.div`
  width: 1000px;
  border: none;
  border-radius: 30px;
  background-color: white;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  padding: 30px 30px 10px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100px;
`;

const Container = styled.div`
  display: flex;
  overflow-y: auto;
  flex-direction: row;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
