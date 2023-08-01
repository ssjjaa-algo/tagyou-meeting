import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { userInfoProps } from "types/types";

const { persistAtom } = recoilPersist();

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

export const IsLogin = atom<boolean>({
  key: "IsLogin",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const UserInfo = atom<userInfoProps>({
  key: "UserInfo",
  default: {
    id: null,
    nickname: null,
  },
});

export const InGameChatStatus = atom<boolean>({
  key: "InGameChatStatus",
  default: false,
});
