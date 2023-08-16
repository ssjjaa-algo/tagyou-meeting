import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import { IsDark, TokenValue } from "../../atoms/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { darkTheme, lightTheme } from "../../styles/ColorSystem";
import GlobalStyle from "../../styles/GlobalStyle";
import LeftContainer from "../leftContainer";
import RightContainer from "../rightContainer";
import Router from "../../Router";

import { BrowserRouter } from "react-router-dom";
import FriendContainer from "containers/friendContainer";
import { Cookies } from "react-cookie";
import { useEffect, useState } from "react";

function Main() {
  const isDark = useRecoilValue(IsDark);
  const showSideBar = () => {
    const position = document.location.pathname;
    if (
      position === "/chatList" ||
      position.search("/chatRoom") === 1 ||
      position === "/mypage" ||
      position === "/home"
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Global styles={GlobalStyle} />
      <BrowserRouter>
        <Container theme={isDark}>
          {/* {Router.caller.name} */}
          {showSideBar() ? <LeftContainer /> : null}
          <RightContainer>
            <Router />
          </RightContainer>
          {showSideBar() ? <FriendContainer /> : null}
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const Container = styled.div<{ theme: boolean }>`
  display: flex;
  background-color: ${(props) =>
    props.theme ? darkTheme.bg.light : lightTheme.bg.light};
  /* border: dotted red 2px; */
  width: 100% !important;
  height: 100% !important;
  min-height: fit-content;
  min-width: fit-content;
`;

export default Main;
