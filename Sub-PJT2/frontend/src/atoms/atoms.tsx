import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const RecordNoState = atom<number>({
  key: "test",
  default: 0,
});

export const IsDark = atom<boolean>({
  key: "IsDark",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const IsOpen = atom<boolean>({
  key: "IsOpen",
  default: true,
  effects_UNSTABLE: [persistAtom],
});
