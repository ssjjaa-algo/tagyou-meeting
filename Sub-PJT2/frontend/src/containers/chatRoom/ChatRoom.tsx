import RightContainer from "../rightContainer/rightContainer-chatRoom/ChatRoom";
import { ChatData } from "types/types";

function ChatRoom() {
  const chatData: ChatData = {
    otherUser: {
      profileImage: "pic6",
      name: "A",
      region: "서울 동작구",
      lastMessage: "ㅎㅇㅎㅇㅎㅇ",
      lastMessageTime: "2023.07.10 17:46",
      age: 28,
      mbti: "ENFJ",
    },
    messages: [
      {
        from: "A",
        to: "B",
        content:
          "내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다",
        time: "2023.07.09 17:46",
      },
      {
        from: "B",
        to: "A",
        content:
          "내용입니다.내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다",
        time: "2023.07.09 17:48",
      },
      {
        from: "A",
        to: "B",
        content:
          "내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다",
        time: "2023.07.09 17:46",
      },
      {
        from: "B",
        to: "A",
        content:
          "내용입니다.내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다",
        time: "2023.07.09 17:48",
      },
      {
        from: "A",
        to: "B",
        content:
          "내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다",
        time: "2023.07.09 17:46",
      },
      {
        from: "B",
        to: "A",
        content:
          "내용입니다.내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다",
        time: "2023.07.09 17:48",
      },
    ],
    user: {
      profileImage: "pic7",
      name: "B",
      region: "서울 은평구",
      lastMessage: "ㅎㅇㅎㅇㅎㅇ",
      lastMessageTime: "2023.07.09 17:46",
      age: 30,
      mbti: "INFP",
    },
  };

  return (
    <div>
      <RightContainer chatData={chatData} />
    </div>
  );
}

export default ChatRoom;
