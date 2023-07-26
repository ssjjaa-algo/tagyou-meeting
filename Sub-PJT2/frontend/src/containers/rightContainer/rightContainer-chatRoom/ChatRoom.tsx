import * as S from "./ChatRoom.styled";
import "css/chat/chatRoom.css";
import React, { useRef } from "react";
import sendButton from "stats/img/button_send.png";

interface chatDataProps {
  chatData: ChatData;
}

const RightContainer = ({ chatData }: chatDataProps) => {
  const chats = () => {
    const result = [];
    const chats = chatData.messages;
    const user = chatData.user;
    result.push(
      <S.ChatBegins>
        <S.Line />
        <div>대화의 시작</div>
        <S.Line />
      </S.ChatBegins>
    );

    for (let i = 0; i < chats.length; i++) {
      if (chats[i].from !== user.name) {
        result.push(
          <S.MessageReceived>
            <S.MessageBox>
              <S.MessageContent>{chats[i].content}</S.MessageContent>
              <S.MessageTime>{chats[i].time}</S.MessageTime>
            </S.MessageBox>
          </S.MessageReceived>
        );
      } else {
        result.push(
          <S.MessageSent>
            <S.MessageBox>
              <S.MessageTime>{chats[i].time}</S.MessageTime>
              <S.MessageContent>{chats[i].content}</S.MessageContent>
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
    <S.Container>
      <S.ChatRoom>
        <S.ChatRoomBody>
          <S.ChatRoomCouterpart>
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
          <S.ChatRoomMain>
            <S.ChatRoomMainBox>
              <S.ChatRoomMainChats className="chatRoom-main-chats">
                <S.ChatRoomMainChatsContent>
                  {chats()}
                </S.ChatRoomMainChatsContent>
                <div ref={bottomRef}></div>
              </S.ChatRoomMainChats>
              <S.ChatRoomMainInput className="chatRoom-main-input">
                <textarea />
                <button>
                  <img src={sendButton} alt="send" />
                </button>
              </S.ChatRoomMainInput>
            </S.ChatRoomMainBox>
          </S.ChatRoomMain>
          <S.ChatRoomUser>
            <div className="user-info">
              M<S.ProfileImg>{chatData.user.profileImage}</S.ProfileImg>
            </div>
          </S.ChatRoomUser>
        </S.ChatRoomBody>
      </S.ChatRoom>
    </S.Container>
  );
};

export default RightContainer;
