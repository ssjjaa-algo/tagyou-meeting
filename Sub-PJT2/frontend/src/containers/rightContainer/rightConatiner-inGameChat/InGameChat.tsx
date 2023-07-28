import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import * as S from "./InGameChat.styled";
import React, { useRef, useContext, useState } from "react";
import { WebSocketContext } from "webSocket/WebSocketProvider";
import "css/chat/inGameChat.css";

import sendButton from "asset/img/button_send.png";
import messageButton from "asset/img/message.png";

type MessageType = {
  user: string;
  message: string;
};

const RightContainer = () => {
  const theme: themeProps = useTheme();

  const ws = useContext(WebSocketContext);
  const [items, setItems] = useState<MessageType[]>([]);
  const [message, setMessage] = useState("");
  const [isShown, setIsShown] = useState({ display: "none" });
  const [isHovering, setIsHovering] = useState(false);

  const addItem = (item: MessageType) => {
    setItems([...items, item]);
  };

  ws.current.onmessage = (evt: MessageEvent) => {
    const data = JSON.parse(evt.data);
    addItem(data.chat);
  };

  const handleChangeText = (e: any) => {
    setMessage(e.target.value);
  };

  const handleClickSubmit = () => {
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
      ws.current.onopen = () => {
        console.log(ws.current.readyState);
        ws.current.send(
          JSON.stringify({
            user: "A",
            chat: message,
          })
        );
      };
      setMessage("");
    }

    // 전송 버튼 누르면 스크롤 맨 아래로 내리는 기능
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 10);
  };
  const bottomRef = useRef<HTMLDivElement>(null);

  // 메시지 아이콘 누르면 채팅 창 열리고 닫히기 기능
  const handleClickMessage = () => {
    if (isShown.display === "flex") {
      setIsShown({ display: "none" });
    } else {
      setIsShown({ display: "flex" });
    }
  };

  // 메시지 아이콘 호버시 메시지 아이콘 확대 기능
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <S.Container theme={theme}>
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
        <S.ChatRoomMainBox theme={theme} style={isShown}>
          <S.ChatRoomMainChats className="chatRoom-main-chats" theme={theme}>
            <S.ChatRoomMainChatsContent>
              {items.map((chat) => {
                return (
                  <S.Messages>
                    {chat.user} : {chat.message}
                  </S.Messages>
                );
              })}
              <div ref={bottomRef}></div>
            </S.ChatRoomMainChatsContent>
          </S.ChatRoomMainChats>
          <S.ChatRoomMainInput className="chatRoom-main-input" theme={theme}>
            <input
              value={message}
              onChange={handleChangeText}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
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
