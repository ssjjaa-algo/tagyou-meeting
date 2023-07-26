import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import Main from "./containers/main/Main";

/* msw - 워커를 실행하는 코드 */
if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <RecoilRoot>
    <React.StrictMode>
      <Main />
    </React.StrictMode>
  </RecoilRoot>
);
