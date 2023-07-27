import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import * as S from "./InGameChat.styled";
import "css/chat/chatRoom.css";
import React, { useRef } from "react";
import sendButton from "asset/img/button_send.png";
import messageButton from "asset/img/message.png";

interface chatDataProps {
  chatData: ChatData;
}

const RightContainer = ({ chatData }: chatDataProps) => {
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
      result.push(
        <S.Messages theme={theme}>
          {chats[i].from} : {chats[i].content}
        </S.Messages>
      );
    }
    return result;
  };

  const bottomRef = useRef<HTMLDivElement>(null);
  window.addEventListener("DOMContentLoaded", function () {
    bottomRef.current?.scrollIntoView();
  });

  return (
    <S.Container theme={theme}>
      <S.ChatRoom theme={theme}>
        <S.ChatRoomMain theme={theme}>
          <S.MessageButton theme={theme}>
            <S.MessageImg src={messageButton} alt="messageButton" />
          </S.MessageButton>
          <S.ChatRoomMainBox theme={theme}>
            <S.ChatRoomMainChats className="chatRoom-main-chats" theme={theme}>
              <S.ChatRoomMainChatsContent theme={theme}>
                {chats()}
              </S.ChatRoomMainChatsContent>
              <div ref={bottomRef}></div>
            </S.ChatRoomMainChats>
            <S.ChatRoomMainInput className="chatRoom-main-input" theme={theme}>
              <textarea />
              <div className="button-outer">
                <S.Button theme={theme} className="button-send">
                  <img src={sendButton} alt="send" />
                </S.Button>
              </div>
            </S.ChatRoomMainInput>
          </S.ChatRoomMainBox>
        </S.ChatRoomMain>
      </S.ChatRoom>
    </S.Container>
  );
};

export default RightContainer;
