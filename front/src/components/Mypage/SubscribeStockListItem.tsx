import styled from "styled-components";
import React, { useState, useEffect } from "react";

interface ItemProps {
  card: {
    stockSubscribeNo: number;
    stockName: string;
    stockCode: number;
    stockCount: number;
    stockSubscribeDay: number;
    stockSubscribeCreate: Date;
    userNo: number;
  };
}

const SubscribeStockListItem: React.FC<ItemProps> = ({ card }) => {

  const [isFront, setIsFront] = useState(true);

  const handleClick = () => {
    setIsFront(!isFront);
  };
  
  const now = Date.now();

  const dateDiff = now - card.stockSubscribeCreate.getTime();

  console.log(dateDiff);

  return (
    <div>
      <button onClick={handleClick}>
        {isFront ? (
        <Card key={card.stockSubscribeNo}>
          <StockName>{card.stockName}</StockName>
          <Content>{}</Content>
        </Card>
        ) : (
          <Card key={card.stockSubscribeNo}>
            <StockName>{card.stockName}</StockName>
            <Content>{card.stockName}</Content>
          </Card>
        )}
      </button>
    </div>
  );
};

export default SubscribeStockListItem;

const Card = styled.div`
  width: 250px;
  height: 170px;
  background-color: black;
  border: none;
  border-radius: 20px;
  margin: 50px;
  padding: 10px;
`;

const StockName = styled.h2`
  color: white;
  text-align: center;
`;

const Content = styled.p`
  color: white;
  text-align: center;
`;