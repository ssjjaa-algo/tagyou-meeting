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
import { Session } from "inspector";

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
  const [location, setLocation] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("");
  useEffect(() => {
    const T = cookies.get("Auth");
    setToken(T);
  }, [cookies.get("Auth")]);
  useEffect(() => {
    setLocation(window.location.pathname);
  }, [token]);
  useEffect(() => {
    console.log(location);
    console.log(location.search("meeting"));
    if (location.search("meeting") !== 1 && location !== "")
      console.log("접속 여부 알려주는 connectHandler 발동");
    token && connectHandler(0);
  }, [location]);

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
  // pathname이 바뀔 경우 pathname이 meeting이 아니면 userStatus를 null로 바꿔야 함
  useEffect(() => {
    console.log(token);
    console.log("위치: " + location);
    if (location !== "" && location !== "/" && location !== "/input") {
      if (location.search("meeting") === 1) {
        fetch(`${process.env.REACT_APP_BASE_URL}/users/setUserStatus`, {
          method: "POST",
          body: "INGAME",
          headers: {
            Auth: token,
          },
        });
      } else {
        fetch(`${process.env.REACT_APP_BASE_URL}/users/setUserStatus`, {
          method: "POST",
          body: "ONLINE",
          headers: {
            Auth: token,
          },
        });
      }
    }
  }, [location]);

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
