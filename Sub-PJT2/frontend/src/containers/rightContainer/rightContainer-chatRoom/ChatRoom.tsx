import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import * as S from "./ChatRoom.styled";
import "css/chat/chatRoom.css";
import React, { useRef } from "react";
import sendButton from "asset/img/button_send.png";
import { ChatData } from "types/types";

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

  const bottomRef = useRef<HTMLDivElement>(null);
  window.addEventListener("DOMContentLoaded", function () {
    bottomRef.current?.scrollIntoView();
  });

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
                </S.ChatRoomMainChatsContent>
                <div ref={bottomRef}></div>
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
