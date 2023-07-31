import { Route, Routes } from "react-router-dom";
import Test from "./components/test/Test";
import Home from "./containers/home";
import MyPage from "containers/myPage/MyPage";
import OnlineMeeting from "containers/onlineMeeting/index";
import ChatRoom from "containers/chatRoom/ChatRoom";
import InGame from "containers/inGame/InGame";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/home" element={<Home />} /> */}
      <Route path="/test" element={<Test />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/meeting" element={<OnlineMeeting />} />
      <Route path="/chatRoom/:nickname" element={<ChatRoom />} />
      <Route path="/inGame" element={<InGame />} />
    </Routes>
  );
};
export default Router;
