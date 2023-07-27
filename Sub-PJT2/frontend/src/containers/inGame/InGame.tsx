import { Global, themeProps } from "@emotion/react";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { IsDark } from "../../atoms/atoms";
import { useRecoilState } from "recoil";
import { darkTheme, lightTheme } from "../../styles/ColorSystem";
import GlobalStyle from "../../styles/GlobalStyle";
import RightContainer from "containers/rightContainer/rightConatiner-inGameChat/InGameChat";

function InGame() {
  const isDark = useRecoilState(IsDark);

  const theme: themeProps = useTheme();

  const chatData: ChatData = {
    otherUser: {
      profileImage: "pic6",
      name: "A",
      region: "서울 동작구",
      lastMessage: "ㅎㅇㅎㅇㅎㅇ",
      lastMessageTime: "2023.07.10 17:46",
      age: 28,
      mbti: "ENFJ",
    },
    messages: [
      {
        from: "A",
        to: "B",
        content:
          "내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다",
        time: "2023.07.09 17:46",
      },
      {
        from: "B",
        to: "A",
        content:
          "내용입니다.내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다",
        time: "2023.07.09 17:48",
      },
      {
        from: "A",
        to: "B",
        content:
          "내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다",
        time: "2023.07.09 17:46",
      },
      {
        from: "B",
        to: "A",
        content:
          "내용입니다.내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다",
        time: "2023.07.09 17:48",
      },
      {
        from: "A",
        to: "B",
        content:
          "내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다",
        time: "2023.07.09 17:46",
      },
      {
        from: "B",
        to: "A",
        content:
          "내용입니다.내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다",
        time: "2023.07.09 17:48",
      },
    ],
    user: {
      profileImage: "pic7",
      name: "B",
      region: "서울 은평구",
      lastMessage: "ㅎㅇㅎㅇㅎㅇ",
      lastMessageTime: "2023.07.09 17:46",
      age: 30,
      mbti: "INFP",
    },
  };

  return (
    <div>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <Global styles={GlobalStyle} />
        <Container theme={theme}>
          <RightContainer chatData={chatData}></RightContainer>
        </Container>
      </ThemeProvider>
    </div>
  );
}
const Container = styled.div<{ theme: themeProps }>`
  /* border: solid black; */
  display: flex;
  background-color: ${(props) => props.theme.bg};
  flex-direction: row;
  justify-content: space-between;
`;

export default InGame;
