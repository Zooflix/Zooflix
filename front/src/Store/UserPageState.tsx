import { atom } from "recoil";

// user page/유저 정보
export const userPageInfoState = atom({
  key: "userPageInfoState",
  default: {
    userNo: 0,
    userId: "",
    userPw: "",
    userName: "",
    userTemperature: 30,
    predictCount: 0,
    successCount: 0,
    predictionRate: 0,
    subscribeToMe: 0,
    subscribeFromMe: 0,
    userZbti: "",
  },
});

// user page / 유저가 쓴 예측 글 목록
export interface userPredict {
  pdNo: number;
  stockName: string;
  pdValue: number;
  pdUpDown: boolean;
  pdDate: string;
  pdResult: string;
  pdContent: string;
  userNo: number;
}

export const userPagePredictListState = atom<userPredict[]>({
  key: "userPagePredictList",
  default: [],
});

export interface Subscription {
  subscribeNo: number;
  subscribeName: string;
  subscribeTemperature: number;
}

// user page / 유저가 구독한 사람 목록
export const userPageSubscribeListState = atom<Subscription[]>({
  key: "userPageSubscribeList",
  default: [],
});
