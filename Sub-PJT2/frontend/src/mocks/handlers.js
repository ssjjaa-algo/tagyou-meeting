import { rest } from "msw";

const testDatas = ["게시글1", "게시글2", "게시글3"];

export const handlers = [
  // 포스트 추가
  rest.post("/posts", (req, res, ctx) => {
    testDatas.push(req.body);
    return res(ctx.status(201));
  }),
];
