import { atom } from "recoil";

export const selectUserNoState = atom({
  key: "selectUserNoState",
  default: 0,
});

export const selectUserNameState = atom({
  key: "selectUserNameState",
  default: "",
});

export const selectStockNameState = atom({
  key: "selectStockNameState",
  default: "",
});

export const selectedPdNoState = atom({
  key: "selectedPdNoState",
  default: 0,
});

export const deletePdNoState = atom({
  key: "deletePdNoState",
  default: 0,
});