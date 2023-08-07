import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import Main from "./containers/main/Main";

/* msw - 워커를 실행하는 코드 */
// if (process.env.NODE_ENV === "development") {
//   const { worker } = require("./mocks/browser");
//   worker.start();
// }

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    {/* 자식 컴포넌트에서 console.log 시 여러 번 출력되서 StrictMode 지웠습니다 */}
    {/* <React.StrictMode> */}
      <Main />
    {/* </React.StrictMode> */}
  </RecoilRoot>
);
