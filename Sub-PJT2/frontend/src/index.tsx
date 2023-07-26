import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import { RecoilRoot } from "recoil";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  </RecoilRoot>
);
