import { atom } from "recoil";

export const isPausedState = atom({
  key: "isPaused",
  default: true,
});
