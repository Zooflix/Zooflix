import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: 'persist-atom-key',
    storage: sessionStorage,
})


// my page/내 정보
export const myPageInfoState = atom({
    key: "myPageInfoState",
    default: {
        userNo: 0,
        userId: "",
        userName: "",
        userTemperature: 30,
        predictCount: 0,
        successCount: 0,
        predictionRate: 0,
        subscribeToMe: 0,
        subscribeFromMe: 0,
        userZbti: "Bear",
    },
    // effects_UNSTABLE: [persistAtom],
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
    // effects_UNSTABLE: [persistAtom],
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
    // effects_UNSTABLE: [persistAtom],
});
// interface MyPredictionDto {
//   stockName: string;
//   pdValue: number;
//   pdUpDown: boolean;
//   pdDate: Date;
//   pdResult: string;
//   pdContent: string;
// }
