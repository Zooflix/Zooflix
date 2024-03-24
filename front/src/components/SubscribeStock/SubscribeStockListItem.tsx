import styled from "styled-components";

interface ItemProps {
  card: {
    stockname: string;
    cardId: number;
    content: string;
  };
}

const SubscribeStockListItem: React.FC<ItemProps> = ({ card }) => {
  return (
    <div>
      <Card key={card.cardId}>
        <StockName>{card.stockname}</StockName>
        <Content>{card.content}</Content>
      </Card>
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
