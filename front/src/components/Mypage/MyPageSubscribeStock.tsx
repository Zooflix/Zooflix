import { getMyStockList } from "../../apis/api/MyPage";
import { useEffect, useState } from "react";
import CardList from "./CardList";
import styled from "styled-components";

import { useRecoilState } from "recoil";
import { userIdState } from "../../Store/UserState";

function MyPageSubscribeStock() {
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
        <div>
          <CardList />
        </div>
      )}
    </Wrapper>
  );
}

export default MyPageSubscribeStock;

const Wrapper = styled.div``;

const NoResultsMessage = styled.div`
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;