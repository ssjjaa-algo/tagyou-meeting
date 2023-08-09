import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import * as S from "./InGameChat.styled";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { InGameChatStatus } from "atoms/atoms";
import "css/chat/inGameChat.css";

import sendButton from "asset/img/button_send.png";
import messageButton from "asset/img/message.png";
import { useRecoilState } from "recoil";
// import { ChatData } from "types/types";

// webSocket 관련
// import { WebSocketContext } from "webSocket/WebSocketProvider";
import useWebSocket, { ReadyState } from "react-use-websocket";
import StompJs, { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { client } from "stompjs";

type Message = {
  content: string;
  message_type: number;
  sender: string;
  meeting_room_id: number;
};

type MessageType = {
  code: number;
  name: string;
};

// const socket = new WebSocket(`ws://${window.location.host}`);

const RightContainer = () => {
  const theme: themeProps = useTheme();

  const [roomId, setRoomId] = useState<number>();

  const client = useRef<CompatClient>();

  const domainAddress = "www.tagyou.com";

  const connectHandler = (roomId: number, codeName: string) => {
    client.current = Stomp.over(() => {
      // 여기서 url 조정하면 됨
      // const socket = new SockJS(`http://${domainAddress}/ws/chat`);
      const socket = new SockJS(`http://localhost:9999/api/ws/chat`);
      return socket;
    });
    client.current.connect(
      {
        // Authorization: token,
      },
      () => {
        client.current!.subscribe(
          `/sub/chat/rooms/${roomId}`,
          (message) => {
            console.log("message: " + message);
            addItem(JSON.parse(message.body));
            // setChatMessage(JSON.parse(message.body));
          }
          // { Authorization: token ? token : "", simpDestination: mockId }
        );
      }
    );
    setRoomId(roomId);
    console.log("...Connecting to Room #" + roomId);
  };

  // const [socketUrl, setSocketUrl] = useState(`ws://${domainAddress}/ws/chat`);
  // const [socketUrl, setSocketUrl] = useState(`ws://localhost:3000/ws`);
  const [items, setItems] = useState<Message[]>([]);
  const [messageHistory, setMessageHistory] = useState([]);
  // const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  // useEffect(() => {
  //   if (lastMessage) {
  //     setMessageHistory((prev) => prev.concat(lastMessage.data));
  //     // 메세지 타입의 code가 2일 경우(메시지 전송일 경우) addItem
  //     if (lastMessage.data.type.code === 2) {
  //       addItem(lastMessage.data);
  //     }
  //   }
  // }, [lastMessage, setItems]);

  // const ws = useContext(WebSocketContext).current;
  // const ws = new WebSocket("ws://localhost:3000/ws");
  const [message, setMessage] = useState("");

  const [isHovering, setIsHovering] = useState(false);
  const [inGameChatStatus, setInGameChatStatus] =
    useRecoilState(InGameChatStatus);

  const addItem = (item: Message) => {
    if (item.message_type === 2) {
      // if (item.messageType === "TALK") {
      setItems([...items, item]);
    }
  };

  // ws.onmessage = (evt: MessageEvent) => {
  //   console.log("message이벤트 발생");
  //   const data = JSON.parse(evt.data);
  //   console.log(evt);
  //   console.log("data: " + data);
  //   if (data.type === "MessageType") {
  //     addItem(data);
  //   }
  // };

  // ws.onmessage = (evt: MessageEvent) => {
  //   console.log("message이벤트 발생");
  //   const data = JSON.parse(evt.data);
  //   console.log("data: " + data);
  //   if (data.type === "MessageType") {
  //     addItem(data);
  //   }
  // };

  const handleChangeText = (e: any) => {
    setMessage(e.target.value);
  };

  const messageSendingType: MessageType = {
    code: 2,
    name: "메시지 전송",
  };

  const messageSending: Message = {
    content: message,
    message_type: 2,
    sender: "A",
    meeting_room_id: 1,
  };
  // useCallback(() => sendMessage(JSON.stringify(messageSent)), []);

  const handleClickSubmit = () => {
    console.log("전송!");
    // prev version/////////////////////////////////////
    // sendMessage(JSON.stringify(messageSending));
    // sendMessage("Hello");

    // lastest version/////////////////////////////////
    console.log("roomId: " + roomId);
    console.log("연결상태: " + client.current?.connected);
    if (!roomId || !client.current?.connected) {
      alert("채팅이 연결되지 않았습니다.");
    } else {
      if (message.length > 0) {
        client.current!.send(
          "/pub/chat/message",
          {},
          JSON.stringify(messageSending)
        );
        console.log(messageSending);
        setMessage("");
      } else {
        alert("메시지를 입력해주세요");
      }
    }

    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 10);
  };

  // const handleClickSubmit = useCallback(() => {
  //   console.log("전송!");
  //   // prev version/////////////////////////////////////
  //   // sendMessage(JSON.stringify(messageSending));
  //   // sendMessage("Hello");

  //   // lastest version/////////////////////////////////
  //   console.log("roomId: " + roomId);
  //   console.log("연결상태: " + client.current?.connected);
  //   if (!roomId || !client.current?.connected) {
  //     alert("채팅이 연결되지 않았습니다.");
  //   } else {
  //     client.current!.send(
  //       "/pub/chat/message",
  //       {},
  //       JSON.stringify(messageSending)
  //     );
  //     setMessage("");
  //   }

  //   setTimeout(() => {
  //     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }, 10);
  // }, []);

  // {
  // console.log("여까지 옴");
  // console.log(items.length);
  // if (message.length > 0) {
  //   console.log(ws.readyState);
  //   console.log(message);
  //   // dummy data
  //   const messageSent: MessageType = {
  //     type: "MessageType",
  //     user: "A",
  //     message: message,
  //   };
  //   addItem(messageSent);
  //   console.log(items);

  //   // 웹소켓으로 데이터 전달
  //   const a = JSON.stringify(messageSent);
  //   console.log("a:" + a);
  //   ws.onopen = () => {
  //     ws.send("뭐가 문제냐?");
  //     ws.send(JSON.stringify(messageSent));
  //   };
  //   console.log(ws);
  //   setMessage("");
  // }

  // 전송 버튼 누르면 스크롤 맨 아래로 내리는 기능
  // setTimeout(() => {
  //   bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, 10);
  // }

  // const handleClickChangeSocketUrl = useCallback(
  //   () => setSocketUrl("ws://localhost:3000/ws"),
  //   []
  // );

  // prev version///////////////////////////////////
  // const connectionStatus = {
  //   [ReadyState.CONNECTING]: "Connecting",
  //   [ReadyState.OPEN]: "Open",
  //   [ReadyState.CLOSING]: "Closing",
  //   [ReadyState.CLOSED]: "Closed",
  //   [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  // }[readyState];

  useEffect(() => {
    // console.log(items);
    if (!chatScreenRef.current?.scrollTop) return;
    console.log(chatScreenRef.current?.scrollTop);
    if (chatScreenRef.current?.scrollTop > 0.5) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  const bottomRef = useRef<HTMLDivElement>(null);

  // 메시지 아이콘 누르면 채팅 창 열리고 닫히기 기능
  const handleClickMessage = () => {
    // console.log(inGameChatStatus);
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

  const loadChats = () => {
    const result = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i] !== undefined) {
        result.push(
          <S.Messages>
            {items[i].sender} : {items[i].content}
          </S.Messages>
        );
      }
    }
    return result;
  };

  // 테스트용 버튼 링크
  const testHandler = () => {
    connectHandler(1, "testRoom");
  };

  const testRoomMake = async () => {
    fetch("http://localhost:9999/api/chat/rooms/1").then((res) =>
      console.log(res)
    );
  };

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
          {/* 테스트용 버튼 */}
          <S.Button theme={theme} onClick={testHandler}>
            Test
          </S.Button>
          <S.Button theme={theme} onClick={testRoomMake}>
            New Room
          </S.Button>
          {/* <button onClick={handleClickChangeSocketUrl}>
            Click Me to change Socket Url
          </button> */}
          {/* The WebSocket is currently {connectionStatus} */}
          <S.ChatRoomMainChats
            className="chatRoom-main-chats"
            theme={theme}
            ref={chatScreenRef}
          >
            <S.ChatRoomMainChatsContent>
              {loadChats()}
              {/* {lastMessage ? (
                <span>Last message: {lastMessage.data}</span>
              ) : null} */}
              <ul>
                {messageHistory.map((message, idx) => (
                  <span key={idx}>{message ? message : null}</span>
                ))}
              </ul>
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
