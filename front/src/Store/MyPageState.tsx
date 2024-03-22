import { atom } from 'recoil';
 
// my page/내 정보
export const myPageInfoState = atom({
  key: 'myPageInfoState',
  default: {
    userName: '',
    userTemperature: 30,
    predictCount: 0,
    successCount: 0,
    predictionRate: 0,
    subscribeToMe: 0,
    subscribeFromMe: 0,
  }
});

// my page / 내가 쓴 예측 글 목록
export const myPagePredictListState = atom({
  key: 'myPagePredictList',
  default: [],
});

export const myPageSubscribeListState = atom({
  key: 'myPageSubscribeList',
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