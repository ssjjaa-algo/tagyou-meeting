import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./components/test/Test";
import Home from "./containers/home";
import MyPage from "containers/myPage/MyPage";
import OnlineMeeting from "containers/onlineMeeting/index"
import ChatList from "containers/chatList/ChatList";
import ChatRoom from "containers/chatRoom/ChatRoom";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/meeting" element={<OnlineMeeting />} />
        <Route path="/chatList" element={<ChatList />} />
        <Route path="/chatRoom" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
