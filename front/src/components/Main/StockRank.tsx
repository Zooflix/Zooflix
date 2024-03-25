import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useState,
} from "react";
import Character3d from "../Character/Character3d";
import styled from "styled-components";
import first from "../../assets/img/rank/first.svg";
import second from "../../assets/img/rank/second.svg";
import third from "../../assets/img/rank/third.svg";

interface Props {
  stockRank: {
    stockCode: number;
    StockName: String;
    subscriberCnt: number;
  }[];
}

function StockRank({ stockRank }: Props) {
  const rankArr = [first, second, third];
  let zbti = new Map();
  zbti.set("Lion", "일단 다 사자");
  zbti.set("Monkey", "재간둥이 원숭이");
  zbti.set("Pig", "저금왕 돼지");
  zbti.set("Rabbit", "팔랑귀 토끼");

  return (
    <RankWrapper>
      {stockRank ? (
        <StockDiv>
          <Title>많은 사람들이 구독중인 주식</Title>
          {stockRank.map((stock, index) => {
            return (
              <StockItem key={index}>
                <Title>
                  <img src={rankArr[index]} height="50px" />
                  {stock.StockName}
                </Title>
                <div>{stock.subscriberCnt}명이 구독중</div>
              </StockItem>
            );
          })}
        </StockDiv>
      ) : (
        <div>Loading...</div>
      )}
    </RankWrapper>
  );
}

export default StockRank;

const RankWrapper = styled.div`
  padding: 10px;
  width: 30%;
  margin-top: 50px;
`;

const Title = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StockDiv = styled.div`
  border: 1px solid rgba(109, 125, 147, 0.15);
  box-shadow: 4px 4px 20px -10px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 20px 15px;
  margin-right: 10px;
`;

const StockItem = styled.div`
  border: 1px solid rgba(109, 125, 147, 0.15);
  box-shadow: 4px 4px 20px -10px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  margin: 15px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`;
