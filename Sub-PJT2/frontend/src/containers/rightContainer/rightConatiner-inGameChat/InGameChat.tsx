import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import * as S from "./InGameChat.styled";
import { useRef, useState, useEffect } from "react";
import { InGameChatStatus } from "atoms/atoms";
import "css/chat/inGameChat.css";

import sendButton from "asset/img/button_send.png";
import messageButton from "asset/img/message.png";
import { useRecoilState } from "recoil";

// webSocket 관련
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

type Message = {
  content: string;
  message_type: string;
  sender: string;
  meeting_room_id: number;
};

const RightContainer = () => {
  const theme: themeProps = useTheme();

  const [roomId, setRoomId] = useState<number>();
  const [items, setItems] = useState<Message[]>([]);
  const [lastMessage, setLastMessage] = useState<Message>();
  const [message, setMessage] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [inGameChatStatus, setInGameChatStatus] =
    useRecoilState(InGameChatStatus);

  const client = useRef<CompatClient>();

  const domainAddress = "www.tagyou.com";

  const roomMake = async () => {
    fetch("http://localhost:9999/api/chat/rooms/1").then((res) =>
      console.log(res)
    );
  };

  // 미팅룸에 들어올때 connectHandler에 roomId와 codeName 변수를 줘야함
  const connectHandler = (roomId: number = 1) => {
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
            addItem(JSON.parse(message.body));
          }
          // { Authorization: token ? token : "", simpDestination: mockId }
        );
      }
    );
    setRoomId(roomId);
    roomMake();
  };

  // 새로고침이나 렌더 후에 채팅방의 기존 채팅을 불러와야하나?
  const requestChatHistory = async () => {
    fetch("http://localhost:9999/api/chat/rooms/1/messages").then((res) =>
      // console.log("res: " + res)
      console.log(res.body)
    );
  };

  useEffect(() => {
    connectHandler(1);
    requestChatHistory();
  }, []);

  const addItem = (item: Message) => {
    if (item.message_type === "TALK") {
      let newItems: Message[] = [];
      newItems = items;
      newItems.push(item);
      setItems(newItems);
      setLastMessage(item);
    }
  };

  const handleChangeText = (e: any) => {
    setMessage(e.target.value);
  };

  const messageSending: Message = {
    content: message,
    message_type: "TALK",
    sender: "A",
    meeting_room_id: 1,
  };

  const handleClickSubmit = () => {
    if (!roomId || !client.current?.connected) {
      alert("채팅이 연결되지 않았습니다.");
    } else {
      if (message.length > 0) {
        client.current!.send(
          "/pub/chat/message",
          {},
          JSON.stringify(messageSending)
        );
        setMessage("");
      } else {
        alert("메시지를 입력해주세요");
      }
    }

    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    if (!chatScreenRef.current?.scrollTop) return;
    // if (chatScreenRef.current?.scrollTop > 0.5) {
    console.log("메시지 입력중...");
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    chatScreenRef.current.scrollTop = 0;
    // }
  }, [message]);

  useEffect(() => {}, [lastMessage]);

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
          {/* <S.Button theme={theme} onClick={testHandler}>
            Test
          </S.Button> */}
          <S.ChatRoomMainChats
            className="chatRoom-main-chats"
            theme={theme}
            ref={chatScreenRef}
          >
            <S.ChatRoomMainChatsContent>
              {items.map((chat, index) => (
                <S.Messages key={index}>
                  {chat.sender} : {chat.content}
                </S.Messages>
              ))}
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
