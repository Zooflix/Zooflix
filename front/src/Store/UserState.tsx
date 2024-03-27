import { atom } from 'recoil';
 
// 아이디
export const userIdState = atom({
    key: 'userIdState',
    default: '',
  });
  
// 비번
export const userPwState = atom({
    key: 'userPwState',
    default: '',
});
// accessToken
export const userAccessTokenState = atom({
  key: 'userAccessTokenState',
  default: '',
});
// 유저 no
export const userNoState = atom({
  key: 'userNoState',
  default: 0,
});