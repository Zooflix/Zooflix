import { atom, useRecoilState } from "recoil";

export const isPausedState = atom({
    key: "isPaused",
    default: true,
});

export const characterState = atom({
    key: "characterState",
    default: {
        name: "",
        characterScale: 0.58,
        canvasWidth: 400,
        canvasHeight: 440,
        toBelow: 35,
        action: "turn"
    }
});