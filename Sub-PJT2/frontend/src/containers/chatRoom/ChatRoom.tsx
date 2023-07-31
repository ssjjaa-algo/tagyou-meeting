import { chatProps } from "types/types";
import { useState, useEffect } from "react";
import Bubble from "components/bubble/Bubble";
import { useRecoilValue } from "recoil";
import { UserInfo } from "../../atoms/atoms";
import * as S from "./ChatRoom.styled";
import { useParams } from "react-router-dom";
const ChatRoom = () => {
  // toUser
  const { nickname } = useParams();
  // fromUser -> 후에 recoil에서 user정보 받아오도록 수정
  const id: string = "A";

  const [chatList, setChatList] = useState<chatProps[]>();

  const [content, setContent] = useState<string>("");

  const handleSendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const insertData = async () => {
      fetch(`/chatlist/${nickname}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: id,
          content: content,
          time: Date.now(),
          to: nickname,
        }),
      });
    };
    insertData();
  };

  useEffect(() => {
    const fetchData = async () => {
      fetch(`/chatlist/${nickname}`).then((res) =>
        res.json().then((data) => setChatList(data))
      );
    };
    fetchData();
  }, [nickname]);

  return (
    <S.Conatiner>
      {chatList?.map((item: chatProps, idx: number) => (
        <S.ChattingBox>
          <Bubble
            key={idx}
            text={item.content}
            time={item.time}
            owner={item.from === id ? "user" : "otherUser"}
          />
        </S.ChattingBox>
      ))}
      <S.Form>
        <S.Input
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></S.Input>
        <button onClick={(e) => handleSendMessage(e)}>
          <S.ArrowCircleUpRoundedIconStyled />
        </button>
      </S.Form>
    </S.Conatiner>
  );
};

export default ChatRoom;
