import { rest } from "msw";
const friendList = [
  {
    id: "hongjaeyeon",
    name: "JAEYEON",
    img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnews.mt.co.kr%2Fmtview.php%3Fno%3D2021031610278225391&psig=AOvVaw0aIAaS3nWgARywqhTRZ56f&ust=1690612248026000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPCKgsnjsIADFQAAAAAdAAAAABAD",
  },

  {
    id: "idTAgUE",
    name: "JoTAEGUE",
    img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnews.mt.co.kr%2Fmtview.php%3Fno%3D2021031610278225391&psig=AOvVaw0aIAaS3nWgARywqhTRZ56f&ust=1690612248026000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPCKgsnjsIADFQAAAAAdAAAAABAD",
  },

  {
    id: "dd",
    name: "Jgfdgdfsgsfd",
    img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnews.mt.co.kr%2Fmtview.php%3Fno%3D2021031610278225391&psig=AOvVaw0aIAaS3nWgARywqhTRZ56f&ust=1690612248026000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPCKgsnjsIADFQAAAAAdAAAAABAD",
  },

  {
    id: "dd",
    name: "dsdsds",
    img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnews.mt.co.kr%2Fmtview.php%3Fno%3D2021031610278225391&psig=AOvVaw0aIAaS3nWgARywqhTRZ56f&ust=1690612248026000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPCKgsnjsIADFQAAAAAdAAAAABAD",
  },
];

const chatList = [
  {
    from: "A",
    to: "B",
    content:
      "내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다",
    time: "2023.07.09 17:46",
  },
  {
    from: "B",
    to: "A",
    content:
      "내용입니다.내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다",
    time: "2023.07.09 17:48",
  },
  {
    from: "A",
    to: "B",
    content:
      "내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다",
    time: "2023.07.09 17:46",
  },
  {
    from: "B",
    to: "A",
    content:
      "내용입니다.내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다",
    time: "2023.07.09 17:48",
  },
  {
    from: "A",
    to: "B",
    content:
      "내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다",
    time: "2023.07.09 17:46",
  },
  {
    from: "B",
    to: "A",
    content:
      "내용입니다.내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다",
    time: "2023.07.09 17:48",
  },
];

export const getProfileData = {
  imgSrc:
    "https://i.namu.wiki/i/e-AmZjk-7-VjN_p7qbd18eIcRUnqfIfeFIlgCtu9A36AXHT4aW4Kk9ScHToD4EvG4Aqswe4CfhscQRTxGa7ivQ.webp",
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

  rest.get("/chatlist", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(chatList));
  }),

  rest.get("/profile", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getProfileData));
  }),
];
