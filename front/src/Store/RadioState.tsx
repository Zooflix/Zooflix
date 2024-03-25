import { atom, useRecoilState } from "recoil";

export const isPausedState = atom({
    key: "isPaused",
    default: true,
});
