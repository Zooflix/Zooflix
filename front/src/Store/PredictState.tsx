import { atom, useRecoilState } from "recoil";

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
