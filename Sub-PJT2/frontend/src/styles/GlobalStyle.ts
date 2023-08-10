import "normalize.css";
import { css } from "@emotion/react";

const GlobalStyle = css`
  @font-face {
    font-family: "Pretendard";
    font-weight: 400;
    font-style: normal;
    src: url("/fonts/woff2/Pretendard-Regular.woff2") format("woff2"),
      url("/fonts/woff/Pretendard-Regular.woff") format("woff");
  }
  @font-face {
    font-family: "Pretendard";
    font-weight: 500;
    font-style: normal;
    src: url("/fonts/woff2/Pretendard-Medium.woff2") format("woff2"),
      url("/fonts/woff/Pretendard-Medium.woff") format("woff");
  }
  @font-face {
    font-family: "Pretendard";
    font-weight: 700;
    font-style: normal;
    src: url("/fonts/woff2/Pretendard-Bold.woff2") format("woff2"),
      url("/fonts/woff/Pretendard-Bold.woff") format("woff");
  }
  
  body {
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    border: solid white;
  }
  ::-webkit-scrollbar {
    width: 0.7rem;
    background-color: transparent;
    /* display: none; */
  }
  body::-webkit-scrollbar-thumb {
    background-color: rgb(208, 208, 208);
    border-radius: 10px;
    background-clip: padding-box;
    border: 3px solid transparent;
  }
  body::-webkit-scrollbar-track {
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px transparent;
    /* background-color: transparent; */
    /* display: none; */
    background: transparent;
  }
  body {
    font-family: "Pretendard";
    font-size: 10px;
    font-weight: 400;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  * {
    box-sizing: border-box;
    font-family: "Pretendard";
  }
  p {
    all: unset;
  }

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  menu,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
    display: none;
  }
  body {
    line-height: 1;
  }
  menu,
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-weight: 300;
    font-family: "Source Sans Pro", sans-serif;
    color: black;
    line-height: 1.2;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  button {
    border: none;
    background-color: unset;
  }
  dialog {
    all: unset;
  }
`;
export default GlobalStyle;
