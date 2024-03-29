import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const zbtiQuestionState = atom({
  key: "zbtiQuestionState",
  default: [] as number[],
});

export const zbtiResultState = atom({
  key: "zbtiResultState",
  default: "",
  effects_UNSTABLE: [persistAtom],
})
