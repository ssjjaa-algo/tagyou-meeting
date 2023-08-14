import { update } from "@react-spring/web";
import { useEffect } from "react";
import { atom, selector } from "recoil";
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

export const ProfileImgSrc = atom<string>({
  key: "ProfileImgSrc",
  default: "",
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

export const UpdateUserInfoFromToken = selector({
  key: "UpdateUserInfoFromToken",
  get: ({ get }) => {
    const tokenValue = get(TokenValue);

    let updateUserInfo = {
      userEmail: "",
      userName: "",
      phoneNumber: "",
      userAge: 0,
      userGender: "MALE",
      userLike: 0,
    };
    const fetchProfile = async () => {
      console.log("tokenValue", tokenValue);
      fetch("http://localhost:9999/api/users/mypage", {
        headers: {
          Auth: tokenValue,
        },
      })
        .then((response) => response.json())
        .then((res) => (updateUserInfo = res));
    };
    fetchProfile();
    return updateUserInfo;
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
