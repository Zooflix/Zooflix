import { atom } from "recoil";

// my page/내 정보
export const myPageInfoState = atom({
    key: "myPageInfoState",
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
        userZbti: "Bear",
    },
});

// my page / 내가 쓴 예측 글 목록
export interface myPredict {
    pdNo: number;
    stockName: string;
    pdValue: number;
    pdUpDown: boolean;
    pdDate: String;
    pdResult: string;
    pdContent: string;
    userNo: number;
}

export const myPagePredictListState = atom<myPredict[]>({
    key: "myPagePredictList",
    default: [],
});

export interface Subscription {
    subscribeNo: number;
    subscribeName: string;
    subscribeTemperature: number;
}

// my page / 내가 구독한 사람 목록
export const myPageSubscribeListState = atom<Subscription[]>({
    key: "myPageSubscribeList",
    default: [],
});
// interface MyPredictionDto {
//   stockName: string;
//   pdValue: number;
//   pdUpDown: boolean;
//   pdDate: Date;
//   pdResult: string;
//   pdContent: string;
// }
