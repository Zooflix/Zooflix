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
const Wrapper = styled.div``;

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
