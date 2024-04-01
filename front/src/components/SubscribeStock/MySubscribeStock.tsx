import { getMyStockList } from "../../apis/api/MyPage";
import React, { useEffect, useState } from "react";
import CardList from "../Mypage/CardList";
import styled from "styled-components";

import { useRecoilState } from "recoil";
import { userIdState } from "../../Store/UserState";

function MySubscribeStock() {
  const [userId, setUserId] = useRecoilState(userIdState);
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
        <>구독 목록이 없습니다.</>
      ) : (
        <div>
          <CardList myStockList={stockList} />
        </div>
      )}
    </Wrapper>
  );
}

export default MySubscribeStock;

const Wrapper = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 50px;
`;
