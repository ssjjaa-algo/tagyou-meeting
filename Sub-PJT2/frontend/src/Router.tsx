import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./components/test/Test";
import Home from "./containers/home";
import ChatList from "containers/chatList/ChatList";
import ChatRoom from "containers/chatRoom/ChatRoom";

  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Main />} />
        <Route path="/test" element={<Test />} />
        <Route path="/chatList" element={<ChatList />} />
        <Route path="/chatRoom" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
