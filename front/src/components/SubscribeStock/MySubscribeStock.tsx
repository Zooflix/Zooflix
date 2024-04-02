import { getMyStockList } from "../../apis/api/MyPage";
import { useEffect, useState } from "react";
import CardList from "../Mypage/CardList";
import styled from "styled-components";

import { useRecoilState } from "recoil";
import { userIdState } from "../../Store/UserState";

function MySubscribeStock() {
  const [userId] = useRecoilState(userIdState);
  const [stockList, setStockList] = useState<
    | {
        stockSubscribeNo: Number;
        stockCode: string;
        stockName: string;
        stockCount: number;
        stockSubscribeCreate: string;
        stockSubscribeDay: number;
        userId: string;
      }[]
  >([]);

  const getStockList = async () => {
    console.log("userId", userId);
    const res = await getMyStockList(userId);
    setStockList(res);
    console.log(res);
  };

  useEffect(() => {
    getStockList();
  }, []);

  return (
    <Wrapper>
      {!stockList ? (
        <h3>현재 정기 구독 중인 주식이 없습니다.</h3>
      ) : (
        <CardListWrapper>
          <CardList />
        </CardListWrapper>
      )}
    </Wrapper>
  );
}

export default MySubscribeStock;

const Wrapper = styled.div``;
const NoResultsMessage = styled.div`
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const CardListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
