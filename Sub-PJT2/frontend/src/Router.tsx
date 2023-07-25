import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./components/test/Test";
import Main from "./containers/main/Main";
import Mypage from "./containers/mypage/Mypage";
import ChatList from "./components/chat/chatList";
import ChatRoom from "components/chat/chatRoom";

const Router = () => {
  const dataList: Array<UserData> = [
    {
      profileImage: "pic1",
      name: "송강",
      region: "서울 은평구",
      lastMessage: "ㅎㅇㅎㅇㅎㅇ",
      lastMessageTime: "2023.07.13 13:56",
      age: 25,
      mbti: "ENTP",
    },
    {
      profileImage: "pic2",
      name: "차은우",
      region: "경기 군포시",
      lastMessage: "ㅎㅇㅎㅇㅎㅇ",
      lastMessageTime: "2023.07.13 14:56",
      age: 24,
      mbti: "ENFP",
    },
    {
      profileImage: "pic3",
      name: "고민시",
      region: "대전 광역시",
      lastMessage: "ㅎㅇㅎㅇㅎㅇ",
      lastMessageTime: "2023.07.13 15:56",
      age: 23,
      mbti: "INTP",
    },
    {
      profileImage: "pic4",
      name: "로운",
      region: "서울 영등포구",
      lastMessage: "ㅎㅇㅎㅇㅎㅇ",
      lastMessageTime: "2023.07.13 17:46",
      age: 21,
      mbti: "ISTP",
    },
    {
      profileImage: "pic5",
      name: "윈터",
      region: "서울 영등포구",
      lastMessage: "ㅎㅇㅎㅇㅎㅁㄴㅇㄹㅇ",
      lastMessageTime: "2023.07.11 15:46",
      age: 23,
      mbti: "ENTJ",
    },
    {
      profileImage: "pic6",
      name: "A",
      region: "서울 동작구",
      lastMessage: "ㅎㅇㅎㅇㅎㅇ",
      lastMessageTime: "2023.07.10 17:46",
      age: 28,
      mbti: "ENFJ",
    },
    {
      profileImage: "pic7",
      name: "B",
      region: "서울 은평구",
      lastMessage: "ㅎㅇㅎㅇㅎㅇ",
      lastMessageTime: "2023.07.09 17:46",
      age: 30,
      mbti: "INFP",
    },
  ];

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
      { from: "A", to: "B", content: "내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다", time: "2023.07.09 17:46" },
      { from: "B", to: "A", content: "내용입니다.내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다", time: "2023.07.09 17:48" },
      { from: "A", to: "B", content: "내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다", time: "2023.07.09 17:46" },
      { from: "B", to: "A", content: "내용입니다.내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다", time: "2023.07.09 17:48" },
      { from: "A", to: "B", content: "내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다", time: "2023.07.09 17:46" },
      { from: "B", to: "A", content: "내용입니다.내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다.내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다", time: "2023.07.09 17:48" },
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

  // const otherUser: UserData = {
  //   profileImage: "pic6",
  //   name: "A",
  //   region: "서울 동작구",
  //   lastMessage: "ㅎㅇㅎㅇㅎㅇ",
  //   lastMessageTime: "2023.07.10 17:46",
  //   age: 28,
  // };

  // const messages: Array<Message> = [
  //   { from: "A", to: "B", content: "내용입니다." },
  //   { from: "B", to: "A", content: "내용입니다." },
  // ];

  // const user: UserData = {
  //   profileImage: "pic3",
  //   name: "고민시",
  //   region: "대전 광역시",
  //   lastMessage: "ㅎㅇㅎㅇㅎㅇ",
  //   lastMessageTime: "2023.07.13 15:56",
  //   age: 23,
  // };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/test" element={<Test />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/chatList" element={<ChatList userData={dataList} />} />
        <Route path="/chatRoom" element={<ChatRoom chatData={chatData} />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
