import { useEffect, useState } from "react";
import styled from "styled-components";
import MyPrediction from "./MyPrediction";

function MyPredictList() {

  // 연습용 더미데이터
  const predictList: Prediction[] = [
    {
      pdNo: 1,
      stockName: 'AAPL',
      pdValue: 150,
      pdUpDown: true,
      pdDate: '2024-03-20',
      pdResult: '성공',
      pdContent: 'Positive news about new product launch.',
    },
    {
      pdNo: 2,
      stockName: 'GOOG',
      pdValue: 3000,
      pdUpDown: false,
      pdDate: '2024-03-21',
      pdResult: '실패',
      pdContent: 'Declining revenue trends.',
    },
  ];

  return (
    <Wrapper>
      <div>
        {predictList.map((prediction, index) => (
          <MyPrediction key={index} prediction={prediction} />
        ))}
      </div>
    </Wrapper>
  );
}

export default MyPredictList;

interface Prediction {
  pdNo: number;
  stockName: string;
  pdValue: number;
  pdUpDown: boolean;
  pdDate: string;
  pdResult: string;
  pdContent: string;
}

const Wrapper = styled.div`
  margin: 20px;
`;

const Predicctlist = styled.div`
    display: flex;
    justify-content: space-between;
`;
