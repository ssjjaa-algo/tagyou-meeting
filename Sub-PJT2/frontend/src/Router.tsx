import { Route, Routes } from "react-router-dom";
import Test from "./components/test/Test";
import Landing from "containers/landing/Landing";
import Home from "./containers/home";
import MyPage from "containers/myPage/MyPage";
import OnlineMeeting from "containers/onlineMeeting/index";
import ChatList from "containers/chatList/ChatList";
import ChatRoom from "containers/chatRoom/ChatRoom";
import InGame from "containers/inGame/InGame";
import LandingStart from "containers/landing/LandingStart/LandingStart";

const Router = () => {
  return (
    <Routes>
      <Route path="" element={<Landing />} />
      <Route path="/start" element={<LandingStart />} />
      <Route path="/home" element={<Home />} />
      <Route path="/test" element={<Test />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/meeting" element={<OnlineMeeting />} />
      <Route path="/chatList" element={<ChatList />} />
      <Route path="/chatRoom" element={<ChatRoom />} />
      <Route path="/inGame" element={<InGame />} />
    </Routes>
  );
};
export default Router;
