import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./components/test/Test";
import Main from "./containers/main/Main";
import Mypage from "./containers/mypage/Mypage";
import ChatList from "containers/chatList/ChatList";
import ChatRoom from "containers/chatRoom/ChatRoom";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/test" element={<Test />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/chatList" element={<ChatList />} />
        <Route path="/chatRoom" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
