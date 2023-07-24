import { atom } from "recoil";

export const RecordNoState = atom<number>({
  key: "test",
  default: 0,
});

export const IsDark = atom<boolean>({
  key: "IsDark",
  default: false,
});
