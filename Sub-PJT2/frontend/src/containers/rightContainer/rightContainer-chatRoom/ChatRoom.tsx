import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import * as S from "./ChatRoom.styled";
import "css/chat/chatRoom.css";
import React, { useEffect, useRef } from "react";
import sendButton from "asset/img/button_send.png";

const RightContainer = ({ chatData }: any) => {
  const theme: themeProps = useTheme();

  const chats = () => {
    const result = [];
    const chats = chatData.messages;
    const user = chatData.user;
    result.push(
      <S.ChatBegins theme={theme}>
        <S.Line theme={theme} />
        <div>대화의 시작</div>
        <S.Line />
      </S.ChatBegins>
    );

    for (let i = 0; i < chats.length; i++) {
      if (chats[i].from !== user.name) {
        result.push(
          <S.MessageReceived theme={theme}>
            <S.MessageBox theme={theme}>
              <S.MessageContent theme={theme}>
                {chats[i].content}
              </S.MessageContent>
              <S.MessageTime>{chats[i].time}</S.MessageTime>
            </S.MessageBox>
          </S.MessageReceived>
        );
      } else {
        result.push(
          <S.MessageSent theme={theme}>
            <S.MessageBox theme={theme}>
              <S.MessageTime>{chats[i].time}</S.MessageTime>
              <S.MessageContent theme={theme}>
                {chats[i].content}
              </S.MessageContent>
            </S.MessageBox>
          </S.MessageSent>
        );
      }
    }
    return result;
  };

  // 대화 창의 스크롤 맨 아래로 내리는기능
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleContentLoaded = () => {
    console.log("content Loaded");
    bottomRef.current?.scrollIntoView();
  };
  useEffect(() => {
    console.log("using Effect");
    handleContentLoaded();
  });
  // 대화 창 스크롤 아래로 내리는 기능  끝

  return (
    <S.Container theme={theme}>
      <S.ChatRoom theme={theme}>
        <S.ChatRoomBody theme={theme}>
          <S.ChatRoomCouterpart theme={theme}>
            <div className="couterpart-info">
              {/* <img src="" alt="" /> */}
              {/* 여기 img 들어가면 바로 아래 div 빼고 couterpart-exceptImg div 수정해야됨 */}
              <S.ProfileImg>{chatData.otherUser.profileImage}</S.ProfileImg>
              <div className="couterpart-exceptImg">
                <div>
                  {chatData.otherUser.name} | {chatData.otherUser.age}
                </div>
                <div>{chatData.otherUser.region}</div>
                <div>{chatData.otherUser.mbti}</div>
              </div>
            </div>
          </S.ChatRoomCouterpart>
          <S.ChatRoomMain theme={theme}>
            <S.ChatRoomMainBox theme={theme}>
              <S.ChatRoomMainChats
                className="chatRoom-main-chats"
                theme={theme}
              >
                <S.ChatRoomMainChatsContent theme={theme}>
                  {chats()}
                  <div ref={bottomRef}></div>
                </S.ChatRoomMainChatsContent>
              </S.ChatRoomMainChats>
              <S.ChatRoomMainInput
                className="chatRoom-main-input"
                theme={theme}
              >
                <textarea />
                <div className="button-outer">
                  <S.Button theme={theme} className="button-send">
                    <img src={sendButton} alt="send" />
                  </S.Button>
                </div>
              </S.ChatRoomMainInput>
            </S.ChatRoomMainBox>
          </S.ChatRoomMain>
          <S.ChatRoomUser theme={theme}>
            <div className="user-info">
              <S.ProfileImg>{chatData.user.profileImage}</S.ProfileImg>
            </div>
          </S.ChatRoomUser>
        </S.ChatRoomBody>
      </S.ChatRoom>
    </S.Container>
  );
};

export default RightContainer;
