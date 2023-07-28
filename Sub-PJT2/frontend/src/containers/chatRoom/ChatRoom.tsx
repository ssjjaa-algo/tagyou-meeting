import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import { IsDark } from "../../atoms/atoms";
import { useRecoilValue } from "recoil";
import { darkTheme, lightTheme } from "../../styles/ColorSystem";
import GlobalStyle from "../../styles/GlobalStyle";
import LeftContainer from "../leftContainer/index";
import RightContainer from "../rightContainer/rightContainer-chatRoom/ChatRoom";

import { leftContainerProprs } from "../../types/leftContainerProprs";
import TestImg from "../../asset/img/imgSrcTest.jpg";
import { ChatData } from "types/types";

function ChatRoom() {
  const isDark = useRecoilValue(IsDark);

  const leftContainerData: leftContainerProprs = {
    imgSrc: TestImg,
    name: "스티븐연",
    age: 32,
  };

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
        <Container>
          <LeftContainer
            imgSrc={leftContainerData.imgSrc}
            name={leftContainerData.name}
            age={leftContainerData.age}
          />
          <RightContainer chatData={chatData} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
const Container = styled.div`
  display: flex;
`;

export default ChatRoom;
