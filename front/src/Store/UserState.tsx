import { atom } from "recoil";

// 아이디
export const userIdState = atom({
  key: "userIdState",
  default: "",
});

// 비번
export const userPwState = atom({
  key: "userPwState",
  default: "",
});

//userNo
export const userNoState = atom({
  key: "userNoState",
  default: 0,
});
