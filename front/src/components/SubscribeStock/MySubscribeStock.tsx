import { getMyStockList } from "../../apis/api/MyPage";
import { useEffect, useState } from "react";
import SubscribeList from "./SubscribeList";
import styled from "styled-components";

import { useRecoilState } from "recoil";
import { userIdState } from "../../Store/UserState";

interface Props {
  fetchData: boolean;
  setFetchData: (value: boolean) => void;
}

function MySubscribeStock({ fetchData, setFetchData }: Props) {
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
  }, [fetchData]);

  return (
    <Wrapper>
      {!stockList ? (
        <h3>현재 정기 구독 중인 주식이 없습니다.</h3>
      ) : (
        <div>
          <SubscribeList
            myStockList={stockList}
            setFetchData={setFetchData}
            fetchData={fetchData}
          />
        </div>
      )}
    </Wrapper>
  );
}

export default MySubscribeStock;

const Wrapper = styled.div`
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  padding: 30px;
  border-radius: 30px;
  h3 {
    color: gray;
  }
  text-align: center;
`;
