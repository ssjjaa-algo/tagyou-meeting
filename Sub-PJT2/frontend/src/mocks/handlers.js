import { rest } from "msw";

const friendList = [
  {
    id: "hongjaeyeon",
    name: "JAEYEON",
    img: "../asset/img/imgSrcTest.jpg",
  },

  {
    id: "idTAgUE",
    name: "JoTAEGUE",
    img: "../asset/img/imgSrcTest.jpg",
  },

  {
    id: "dd",
    name: "Jgfdgdfsgsfd",
    img: "../asset/img/imgSrcTest.jpg",
  },

  {
    id: "dd",
    name: "dsdsds",
    img: "../asset/img/imgSrcTest.jpg",
  },
];

export const getProfileData = {
  imgSrc: "https://i.namu.wiki/i/e-AmZjk-7-VjN_p7qbd18eIcRUnqfIfeFIlgCtu9A36AXHT4aW4Kk9ScHToD4EvG4Aqswe4CfhscQRTxGa7ivQ.webp",
  name: "스티븐",
  age: 32,
  email: "taguzzang@gmail.com",
  mbti: "ISFP",
  job: "개발자",
  hobby: "강아지 밥주기",
  like: 100,
  region_sido: "서울특별시",
  region_sigungu: "은평구",
};

export const handlers = [
  rest.get("/friends/list", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(friendList));
  }),

  rest.get("/profile", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getProfileData));
  }),
];

