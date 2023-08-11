import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { userProps, profileProps } from "types/types";

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

export const TokenValue = atom<string>({
  key: "TokenValue",
  default: "",
});

export const IsLogin = atom<boolean>({
  key: "IsLogin",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const UserInfo = atom<userProps>({
  key: "UserInfo",
  default: {
    userEmail: "",
    userName: "",
    phoneNumber: "",
    userAge: 0,
    userGender: "MALE",
    userLike: 0,
  },
});

export const ProfileInfo = atom<profileProps>({
  key: "ProfileInfo",
  default: {
    userSido: "",
    userSidoCode: 0,
    userGugun: "",
    userJob: "",
    userHobby: "",
    userMbti: "",
    content: "",
  },
});

export const InGameChatStatus = atom<boolean>({
  key: "InGameChatStatus",
  default: false,
});

export const GameStart = atom<boolean>({
  key: "GameStart",
  default: false,
});
