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
import { useEffect, useRef, useState } from "react";
import React from "react";
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

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

  const cookies = new Cookies();
  const [token, setToken] = useRecoilState(TokenValue);
  useEffect(() => {
    const T = cookies.get("Auth");
    setToken(T);
  }, [cookies.get("Auth")]);
  useEffect(() => {
    token && connectHandler(0);
  }, [token]);

  const client = useRef<CompatClient>();
  const socket = new SockJS(`${process.env.REACT_APP_BASE_URL}/ws/chat`);
  const connectHandler = (roomId: number) => {
    client.current = Stomp.over(() => {
      // 여기서 url 조정하면 됨
      return socket;
    });
    console.log("바로직전: " + token);
    const headers = {
      Auth: token,
      Info: "online",
    };
    client.current.connect(headers, () => {
      console.log("연결됨");
    });
  };
  const headers = {
    Auth: token,
  };
  socket.onclose = () => {
    socket.close(1000, token);
  };

  // if (window.onbeforeunload) {
  //   alert(token);
  //   fetch(`${process.env.REACT_APP_BASE_URL}/users/setUserStatus`, {
  //     method: "POST",
  //     body: "OFFLINE",
  //     headers: {
  //       Auth: token,
  //     },
  //   });
  // }

  // window.addEventListener("beforeunload", (event) =>{
  //   event?.preventDefault();
  //   alert(token);
  //   fetch(`${process.env.REACT_APP_BASE_URL}/users/setUserStatus`, {
  //     method: "POST",
  //     body: "OFFLINE",
  //     headers: {
  //       Auth: token,
  //     },
  //   });
  //   return event.returnValue = '';
  // })

  // window.addEventListener("beforeunload", (event) => {
  //   event.preventDefault();
  //   // alert("종료?");
  //   fetch(`${process.env.REACT_APP_BASE_URL}/users/setUserStatus`, {
  //     method: "POST",
  //     body: "OFFLINE",
  //     headers: {
  //       Auth: token,
  //     },
  //   });
  //   event.returnValue = "";
  //   return ".";
  // });

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
