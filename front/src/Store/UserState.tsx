import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// 아이디
const { persistAtom } = recoilPersist({
  key: "userIdState", //원하는 key 값 입력
  storage: localStorage,
});

export const userIdState = atom({
  key: "userIdState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

//유저 이름
export const userNameState = atom({
  key: "userNameState",
  default: "",
});

// accessToken
export const userAccessTokenState = atom({
  key: "userAccessTokenState",
  default: "",
});

// 유저 no
export const userNoState = atom({
  key: "userNoState",
  default: 0,
});

// 수정용 유저 정보
export const updateUserInfoState = atom({
  key: "updateUserInfoState",
  default: {
    userId: "",
    userPW: "",
    userName: "",
    userAppKey: "",
    userSecretKey: "",
    userAccount: "",
  },
});
