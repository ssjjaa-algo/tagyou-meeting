import "@emotion/react";

type theme = "light" | "dark";

declare module "@emotion/react" {
  export interface themeProps {
    bgColor: string;
    pointDeepColor: string;
    pointLightColor: string;
    fontColor: string;
    fontSubColor: string;
  }
}
