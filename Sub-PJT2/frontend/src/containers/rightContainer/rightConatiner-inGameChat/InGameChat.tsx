import { themeProps } from "@emotion/react";
import { List, useTheme } from "@mui/material";
import * as S from "./InGameChat.styled";
import { useRef, useState, useEffect } from "react";
import { InGameChatStatus, TokenValue } from "atoms/atoms";
import "css/chat/inGameChat.css";

import sendButton from "asset/img/button_send.png";
import messageButton from "asset/img/message.png";
import { useRecoilState, useRecoilValue } from "recoil";

// webSocket 관련
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import imgDown from "asset/img/icons8-down-100.png";
import { Cookies } from "react-cookie";
import e from "express";

type SendingMessage = {
  content: string;
  message_type: string;
  meeting_room_id: number;
};

type ReceivingMessage = {
  content: string;
  message_type: string;
  sender: string;
  meeting_room_id: number;
};

type Room = {
  roomId: number;
  maleUserNicknmae: string;
  femaleUserNicknmae: string;
};

const RightContainer = () => {
  const theme: themeProps = useTheme();

  const [roomId, setRoomId] = useState<number>(1);
  const [items, setItems] = useState<ReceivingMessage[]>([]);
  const [lastMessage, setLastMessage] = useState<ReceivingMessage>();
  const [message, setMessage] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [inGameChatStatus, setInGameChatStatus] =
    useRecoilState(InGameChatStatus);
  const [token, setToken] = useRecoilState(TokenValue);
  const [pullDown, setPullDown] = useState<boolean>(true);
  const [newMEssageNoticeStatus, setNewMEssageNoticeStatus] = useState({
    display: "none",
  });
  const cookies = new Cookies();

  const client = useRef<CompatClient>();

  const domainAddress = "www.tagyou.site";

  // 방번호 조회
  const getRoomId = async () => {
    console.log("roomId 확인 전 발급된 토큰 확인: " + token);
    fetch(`${process.env.REACT_APP_BASE_URL}/rooms/one/1`, {
      method: "POST",
      headers: {
        Auth: token,
      },
    })
      .then((res) => res.json())
      .then((data: Room) => {
        console.log(data);
        setRoomId(1);
      });
  };

  // const roomSync = async () => {
  //   console.log("roomConnect 함수 실행");
  //   fetch(`${process.env.REACT_APP_BASE_URL}/chat/rooms/${roomId}`, {
  //     headers: {
  //       Auth: token,
  //     },
  //   }).then((res) => console.log(res));
  // };

  // 미팅룸에 들어올때 connectHandler에 roomId와 codeName 변수를 줘야함
  const connectHandler = (roomId: number) => {
    client.current = Stomp.over(() => {
      // 여기서 url 조정하면 됨
      // const socket = new SockJS(`http://${domainAddress}/ws/chat`);
      // const socket = new SockJS(`${process.env.REACT_APP_BASE_URL}/ws/chat`, {
      //   headers: {
      //     Auth: token,
      //   },
      // });
      const socket = new SockJS(`${process.env.REACT_APP_BASE_URL}/ws/chat`);
      return socket;
    });
    client.current.connect({ Authorization: token }, () => {
      // 해당 방과 동기화(?)
      // roomSync();
      client.current!.subscribe(`/sub/chat/rooms/${roomId}`, (message) => {
        addItem(JSON.parse(message.body));
      });
      const enteringMessageRoom: SendingMessage = {
        content: "님이 입장하셨습니다.",
        message_type: "ENTER",
        meeting_room_id: roomId,
      };
      client.current!.send(
        "/pub/chat/message",
        {},
        JSON.stringify(enteringMessageRoom)
      );
    });
    requestChatHistory(roomId);
    console.log("token: " + token);
  };

  // 새로고침이나 렌더 후에 채팅방의 기존 채팅을 불러오는 부분
  const requestChatHistory = async (roomId: number) => {
    console.log("chatHistory 조회하기 전 토큰 확인: " + token);
    fetch(`${process.env.REACT_APP_BASE_URL}/chat/rooms/${roomId}/messages`, {
      headers: {
        Auth: token,
      },
    })
      .then((response) => response.json())
      .then((data: ReceivingMessage[]) => {
        for (let i = 0; i < data.length; i++) {
          addItem(data[i]);
        }
      });
  };

  // 렌더링 후 연결
  useEffect(() => {
    const T = cookies.get("Auth");
    setToken(T);
  }, [cookies.get("Auth")]);

  useEffect(() => {
    // 연결됐던 방이 있다면 RoomId 조회
    // getRoomId();
    console.log("방 번호: " + roomId);
    // 채팅 웹소켓 연결
    token && connectHandler(roomId);
  }, [token]);

  const handelScroll = () => {
    if (!chatScreenRef.current) return;
    if (chatScreenRef.current.scrollTop >= 0) {
      setNewMEssageNoticeStatus({ display: "none" });
    }
  };

  const addItem = (item: ReceivingMessage) => {
    if (item.message_type === "TALK" || "ENTER" || "EXIT") {
      let newItems: ReceivingMessage[] = [];
      newItems = items;
      newItems.push(item);
      if (!chatScreenRef.current) return;
      if (chatScreenRef.current.scrollTop >= 0) {
        setPullDown(true);
      } else {
        setPullDown(false);
      }
      setItems(newItems);
      setLastMessage(item);
    }
  };

  const handleChangeText = (e: any) => {
    setMessage(e.target.value);
  };

  // client에 있는 토큰 이용해서 loginUser 정보를 받아와야 함
  // const user = "A"
  const [user, setUser] = useState<string>("");

  const handleUserChange = (e: any) => {
    setUser(e.target.value);
  };

  const messageSending: SendingMessage = {
    content: message,
    message_type: "TALK",
    meeting_room_id: roomId,
  };

  const handleClickSubmit = () => {
    if (!roomId || !client.current?.connected) {
      alert("채팅이 연결되지 않았습니다.");
    } else {
      if (message.length > 0) {
        client.current!.send(
          "/pub/chat/message",
          // "/chat/message",
          {},
          JSON.stringify(messageSending)
        );
        setMessage("");
      } else {
        alert("메시지를 입력해주세요");
      }
    }
  };

  useEffect(() => {
    if (chatScreenRef.current) {
      if (lastMessage?.sender === user || pullDown) {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      } else if (!pullDown || chatScreenRef.current.scrollTop >= 0) {
        setNewMEssageNoticeStatus({ display: "flex" });
      }
    }
  }, [lastMessage]);

  const handleClickNewMessage = () => {
    if (!chatScreenRef.current) return;
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    setNewMEssageNoticeStatus({ display: "none" });
  };

  // 메시지 아이콘 누르면 채팅 창 열리고 닫히기 기능
  const handleClickMessage = () => {
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
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const loadChats = () => {
    const result = [];
    for (let i = 0; i < items.length - 1; i++) {
      result.push(
        <S.Messages theme={theme} key={i}>
          <S.Sender>{items[i].sender}</S.Sender>
          <S.Content>{items[i].content}</S.Content>
        </S.Messages>
      );
    }
    if (lastMessage) {
      result.push(
        <S.Messages theme={theme} key={items.length - 1} ref={lastMessageRef}>
          <S.Sender>{lastMessage.sender}</S.Sender>
          <S.Content>{lastMessage.content}</S.Content>
        </S.Messages>
      );
    }
    return result;
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
      <S.ChatRoomMain theme={theme} className="chatRoomMain">
        <S.MessageButton
          theme={theme}
          onClick={handleClickMessage}
          onMouseOut={handleMouseOut}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 1.1 }}
        >
          <S.MessageImg src={messageButton} alt="messageButton" />
        </S.MessageButton>
        <S.ChatRoomMainBox
          theme={theme}
          className={inGameChatStatus ? "chatBoxShown" : "chatBoxHidden"}
        >
          {/* 테스트용 User Input */}
          <input type="text" value={user} onChange={handleUserChange} />
          <S.Button theme={theme} onClick={getRoomId}>
            Register
          </S.Button>
          <S.Button theme={theme} onClick={() => connectHandler(roomId)}>
            Connect
          </S.Button>
          <S.ChatRoomMainChats
            className="chatRoom-main-chats"
            theme={theme}
            ref={chatScreenRef}
            onScroll={handelScroll}
          >
            <S.ChatRoomMainChatsContent>
              {loadChats()}
            </S.ChatRoomMainChatsContent>
          </S.ChatRoomMainChats>
          <S.NewMessageNotice
            theme={theme}
            style={newMEssageNoticeStatus}
            onClick={handleClickNewMessage}
          >
            <S.ImgDown src={imgDown}></S.ImgDown>New Message
          </S.NewMessageNotice>
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
                onClick={handleClickSubmit}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 1.1 }}
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
