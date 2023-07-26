import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import Main from "./containers/main/Main";
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
