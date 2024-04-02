import styled from "styled-components";
import first from "../../assets/img/rank/first.svg";
import second from "../../assets/img/rank/second.svg";
import third from "../../assets/img/rank/third.svg";
import { useRecoilState } from "recoil";
import {
  selectedStockCode,
  selectedStockName,
} from "../../Store/StockSubscribeState";
import { useNavigate } from "react-router-dom";

interface Props {
  stockRank: any[];
  zbti: Map<string, string>;
}

function StockRank({ stockRank, zbti }: Props) {
  const rankArr = [first, second, third];
  const [selectStockName, setSelectStockName] =
    useRecoilState(selectedStockName);
  const [selectStockCode, setSelectStockCode] =
    useRecoilState(selectedStockCode);
  const navigate = useNavigate();

  function selectStock(name: string, code: string) {
    setSelectStockName(name);
    setSelectStockCode(code);
    navigate("/stocksub");
  }

  return (
    <RankWrapper>
      {stockRank ? (
        <StockDiv>
          <Title>많은 사람들이 구독중인 주식</Title>
          {stockRank.map((stock, index) => {
            return (
              <StockItem
                key={index}
                onClick={() => {
                  selectStock(stock.stockName, stock.stockCode);
                }}
              >
                <Title>
                  <img src={rankArr[index]} height="50px" />
                  {stock.stockName}
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
  &:hover {
    scale: 1.05;
  }
`;
