import styled from "styled-components";
import React from "react";
import { cancelStockSubscribe } from "../../apis/api/Subscribe";

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
  cardIndex: number;
}

const Card: React.FC<ItemProps> = ({ card, cardIndex }) => {
  const color = [
    "linear-gradient(180deg, rgba(172, 228, 152, 0.95) 6.05%, rgba(211, 249, 194, 0.95) 33.05%, rgba(196, 236, 214, 0.95) 58.05%, rgba(175, 227, 239, 0.95) 81.05%, rgba(130, 211, 228, 0.95) 106.05%)",
    "linear-gradient(180deg, rgba(255, 124, 124, 0.95) 6.05%, rgba(255, 161, 108, 0.95) 42.05%, rgba(255, 172, 74, 0.95) 60.55%, rgba(255, 190, 89, 0.95) 75.55%, rgba(255, 225, 120, 0.95) 106.05%)",
    "linear-gradient(180deg, rgba(255, 108, 196, 0.95) 6.05%, rgba(255, 171, 227, 0.95) 50.15%, rgba(255, 255, 255, 0.95) 106.05%)",
    "linear-gradient(180deg, rgba(104, 183, 255, 0.95) 6.05%, rgba(128, 194, 255, 0.95) 42.05%, rgba(164, 211, 255, 0.95) 60.55%, rgba(185, 222, 255, 0.95) 75.55%, rgba(228, 242, 255, 0.95) 106.05%)",
  ];

  const date = new Date(card.stockSubscribeCreate);
  console.log(date);

  async function terminationSubscribe() {
    const result = await cancelStockSubscribe(card.stockSubscribeNo);
  }

  return (
    <CardWrapper>
      <Wrapper color={color[cardIndex % 4]}>
        <Front>
          <Title>{card && card.stockName}</Title>
          <Writer>
            매월 {card.stockSubscribeDay}일<br />
            수량 {card.stockCount}주씩
            <br />
            구독중
          </Writer>
        </Front>
        <Back>
          <Content>
            {card.stockSubscribeCreate && (
              <div>
                {date.getFullYear()}년 {date.getMonth()}월 {date.getDate()}
                일부터 구독중
              </div>
            )}

            <Button onClick={terminationSubscribe}>구독 해지</Button>
          </Content>
        </Back>
      </Wrapper>
    </CardWrapper>
  );
};

export default Card;

const Wrapper = styled.div<{ color: string }>`
  width: 200px;
  height: 120px;
  margin: 10px;
  transition: all 1s;
  transform-style: preserve-3d;
  border-radius: 20px;
  background: ${(props) => props.color};
  border: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;
const CardWrapper = styled.div`
  &:hover ${Wrapper} {
    transform: rotateY(180deg);
  }
`;
const Front = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  color: white;
  padding: 10px 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  word-wrap: break-word;

  hr {
    width: 80%;
  }
`;
const Back = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  color: black;

  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  word-wrap: break-word;
`;

const Title = styled.div`
  height: 30%;
  display: flex;
  text-align: start;
  justify-content: center;
  padding: 0 15px;
  font-size: 20px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const Writer = styled.div`
  font-size: 13px;
`;
const Content = styled.div`
  padding: 0 10px;
  color: white;
  font-size: 12px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  box-shadow: 4px 4px 20px -10px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  padding: 5px 20px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
`;
