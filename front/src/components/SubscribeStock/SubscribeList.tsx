import React from "react";
import styled from "styled-components";
import Card from "../Mypage/Card";

interface Props {
  myStockList: any[];
  setFetchData: (value: boolean) => void;
  fetchData: boolean;
}

function SubscribeList({ myStockList, setFetchData, fetchData }: Props) {
  return (
    <Wrapper>
      <Container>
        {myStockList.map((card, index) => (
          <Card
            key={index}
            card={card}
            cardIndex={index}
            setFetchData={setFetchData}
            fetchData={fetchData}
          />
        ))}
      </Container>
    </Wrapper>
  );
}

export default SubscribeList;
const Wrapper = styled.div``;

const Container = styled.div`
  display: flex;
  overflow-y: auto;
  flex-direction: row;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
