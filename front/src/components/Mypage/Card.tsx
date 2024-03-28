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

    // const dateDiff = now - card.stockSubscribeCreate.getTime();

    // console.log(dateDiff);

    return (
        <ItemContainer>
            <button onClick={handleClick}>
                {isFront ? 
                    <Item>
                        <StockName>{card.stockName}</StockName>
                        <Content>{}</Content>
                    </Item> : 
                    <Item>
                        <StockName>gd</StockName>
                        <Content>gd</Content>
                    </Item>
                }
            </button>
        </ItemContainer>
    );
};

export default SubscribeStockListItem;

const ItemContainer = styled.div`
    width: 195px;
    height: 140px;
    display: flex;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const Item = styled.div`
    width: 100%;
    height: 100%;
    background-color: black;
    border: none;
    border-radius: 20px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StockName = styled.h2`
    color: white;
    text-align: center;
`;

const Content = styled.p`
    color: white;
    text-align: center;
`;
