import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import * as S from "./InGameChat.styled";
import React, { useRef, useContext, useState, useEffect } from "react";
import { WebSocketContext } from "webSocket/WebSocketProvider";
import { InGameChatStatus } from "atoms/atoms";
import "css/chat/inGameChat.css";

import sendButton from "asset/img/button_send.png";
import messageButton from "asset/img/message.png";
import { useRecoilState } from "recoil";
// import { ChatData } from "types/types";

type MessageType = {
  user: string;
  message: string;
};

const RightContainer = () => {
  const theme: themeProps = useTheme();

  const ws = useContext(WebSocketContext);
  const [items, setItems] = useState<MessageType[]>([]);
  const [message, setMessage] = useState("");

  const [isHovering, setIsHovering] = useState(false);
  const [inGameChatStatus, setInGameChatStatus] =
    useRecoilState(InGameChatStatus);

  const addItem = (item: MessageType) => {
    setItems([...items, item]);
  };

  ws.current.onmessage = (evt: MessageEvent) => {
    const data = JSON.parse(evt.data);
    addItem(data.chat);
    console.log(data);
  };

  const handleChangeText = (e: any) => {
    setMessage(e.target.value);
  };

  const handleClickSubmit = () => {
    console.log("여까지 옴");
    console.log(items.length);
    if (message.length > 0) {
      console.log(ws.current.readyState);
      console.log(message);
      console.log(items);
      // dummy data
      const messageSent: MessageType = {
        user: "A",
        message: message,
      };
      addItem(messageSent);

      // 웹소켓으로 데이터 전달
      ws.current.send(
        JSON.stringify({
          user: "A",
          chat: message,
        })
      );
      setMessage("");
    }

    // 전송 버튼 누르면 스크롤 맨 아래로 내리는 기능
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 10);
  };

  useEffect(() => {
    if (!chatScreenRef.current?.scrollTop) return;
    console.log(chatScreenRef.current?.scrollTop);
    if (chatScreenRef.current?.scrollTop > 0.5) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);
  const bottomRef = useRef<HTMLDivElement>(null);

  // 메시지 아이콘 누르면 채팅 창 열리고 닫히기 기능
  const handleClickMessage = () => {
    console.log(inGameChatStatus);
    setInGameChatStatus(!inGameChatStatus);
  };

  // 메시지 아이콘 호버시 메시지 아이콘 확대 기능
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };

  // alt + c 누르면 채팅 나오는 기능
  window.onkeydown = (e) => {
    if (e.key === "c" && e.altKey) {
      handleClickMessage();
    }
  };

  const chatScreenRef = useRef<HTMLDivElement>(null);

  return (
    <S.Container
      theme={theme}
      className={
        inGameChatStatus
          ? "inGameChatContainerShown"
          : "inGameChatContainerHidden"
      }
    >
      <S.ChatRoomMain theme={theme}>
        <S.MessageButton
          theme={theme}
          onClick={handleClickMessage}
          className={isHovering ? "grow" : ""}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <S.MessageImg src={messageButton} alt="messageButton" />
        </S.MessageButton>
        <S.ChatRoomMainBox
          theme={theme}
          className={inGameChatStatus ? "chatBoxShown" : "chatBoxHidden"}
        >
          <S.ChatRoomMainChats
            className="chatRoom-main-chats"
            theme={theme}
            ref={chatScreenRef}
          >
            <S.ChatRoomMainChatsContent>
              {/* {items.length > 0
                ? items.map((chat, index) => {
                    return (
                      <S.Messages key={index}>
                        {chat.user} : {chat.message}
                      </S.Messages>
                    );
                  })
                : 1} */}
              {/* 스크롤 맨 아래로 내리기 위한 레퍼런스 */}
              <div ref={bottomRef}></div>
            </S.ChatRoomMainChatsContent>
          </S.ChatRoomMainChats>
          <S.ChatRoomMainInput className="chatRoom-main-input" theme={theme}>
            <input
              value={message}
              onChange={handleChangeText}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.ctrlKey) {
                  return;
                } else if (e.key === "Enter") {
                  handleClickSubmit();
                }
              }}
            />
            <div className="button-outer">
              <S.Button
                theme={theme}
                className="button-send"
                onClick={handleClickSubmit}
              >
                <img src={sendButton} alt="send" />
              </S.Button>
            </div>
          </S.ChatRoomMainInput>
        </S.ChatRoomMainBox>
      </S.ChatRoomMain>
    </S.Container>
  );
};

export default RightContainer;
