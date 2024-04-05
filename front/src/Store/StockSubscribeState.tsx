import { atom } from "recoil";

// 주식 구독 목록
export interface stockSubscription {
  stockSubscribeNo: number;
  stockName: string;
  stockCode: string;
  stockCount: number;
  stockSubscribeDay: number;
  stockSubscribeCreate: Date;
  userNo: number;
}

export const stockSubListState = atom<stockSubscription[]>({
  key: "stockSubListState",
  default: [],
});

export const selectedStockName = atom({
  key: "selectedStockName",
  default: "",
});

export const selectedStockCode = atom({
  key: "selectedStockCode",
  default: "",
});
