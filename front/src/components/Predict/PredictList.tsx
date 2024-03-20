import styled from "styled-components";
import React, { useState } from 'react';

import Feedbtn from "../../assets/img/button/Feedbtn.svg";


interface FeedProps {
  pdUpDown: boolean;
  pdResult: string;
}


function PredictList() {

  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleContent = (pdNo: number) => {
    setOpenItems(prevState => {
      if (prevState.includes(pdNo)) {
        return prevState.filter(item => item !== pdNo);
      } else {
        return [...prevState, pdNo];
      }
    });
  };

  interface ClickProps {
    isOpen: boolean;
  }
  
  const Click = styled.div<ClickProps>`
    display: ${props => props.isOpen ? 'flex' : 'none'};
    padding: 10px 30px 30px 30px;
  `;

  const header =  [
    {
      pdNo: 1,
      stockName: '삼성전자',
      userName: '다라란',
      content: '근거입니당',
      pdDate: '2024-03-20',
      pdValue: '75000',
      pdUpDown: true,
      pdResult: ""
    },
    {
      pdNo: 2,
      stockName: 'SK하이닉스',
      userName: '양나박이',
      content: '근거입니당',
      pdDate: '2024-03-20',
      pdValue: '175000',
      pdUpDown: false,
      pdResult: ""
    },
    {
      pdNo: 3,
      stockName: '카카오',
      userName: '안녕하세요제이름은',
      content: '2차전지 관련 주로  현재 관련 주식이 평균 12% 이상 상승하였음 □□화성, 파이☆, ◇에너지, 자이○  등 현재 호재가 있음 ',
      pdDate: '2024-03-20',
      pdValue: '200',
      pdUpDown: false,
      pdResult: "상승"
    },
  ]
  return (
    <Wrapper>
      {header.map((item) => (
        <Feed key={item.pdNo} pdUpDown={item.pdUpDown} pdResult={item.pdResult}>
        <Noncllick>
          <p style={{ width: "100px" }}>{item.stockName}</p>
          <p style={{ width: "100px" }}>{item.userName}</p>
          <p style={{ width: "100px" }}>{item.pdDate}</p>
          <p style={{ width: "100px" }}>{item.pdValue} {item.pdUpDown ? '▲' : '▼'}</p>
          <button onClick={() => toggleContent(item.pdNo)}>
              <img src={Feedbtn} alt="Feed Button" />
            </button>
          </Noncllick>
          <Click isOpen={openItems.includes(item.pdNo)}>
            {item.content}
          </Click>
        </Feed>
      ))}
    </Wrapper>
  );
}

export default PredictList;
const Wrapper = styled.div`

`;

const Feed = styled.div<FeedProps>`

border-radius: 15px;
background-color: white;
box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
margin-bottom: 20px;
background: ${props => props.pdResult ? 'linear-gradient(to bottom, #F0F0F0, #FFFFFF)'
: (props.pdUpDown ? 'linear-gradient(to bottom, #FFF3F3, #FFFFFF)'
: 'linear-gradient(to bottom, #F3FAFF, #FFFFFF)')};


button {
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
}

img {
  width: 24px;
  height: 24px;
}
`;

const Noncllick = styled.div`
display: flex;
justify-content: space-evenly;
p{
  width: "100px";
  text-align: center;
}
`;

