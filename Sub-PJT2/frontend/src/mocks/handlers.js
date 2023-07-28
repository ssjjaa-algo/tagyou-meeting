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

export const handlers = [
  rest.get("/friends/list", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(friendList));
  }),
];
