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
