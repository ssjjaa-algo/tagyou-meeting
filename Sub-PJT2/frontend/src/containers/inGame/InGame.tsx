import React from "react";
import WebSocketProvider from "webSocket/WebSocketProvider";
import { Global, themeProps } from "@emotion/react";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { IsDark } from "../../atoms/atoms";
import { useRecoilState } from "recoil";
import { darkTheme, lightTheme } from "../../styles/ColorSystem";
import GlobalStyle from "../../styles/GlobalStyle";
import RightContainer from "containers/rightContainer/rightConatiner-inGameChat/InGameChat";
// import { ChatData } from "types/types";

function InGame() {
  const isDark = useRecoilState(IsDark);

  const theme: themeProps = useTheme();

  return (
    <div>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <Global styles={GlobalStyle} />
        <Container theme={theme}>
          <WebSocketProvider>
            <RightContainer />
          </WebSocketProvider>
        </Container>
      </ThemeProvider>
    </div>
  );
}
const Container = styled.div<{ theme: themeProps }>`
  /* border: solid red; */
  display: flex;
  background-color: ${(props) => props.theme.bg};
  flex-direction: row;
  height: 100vh;
`;

export default InGame;
