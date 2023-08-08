import { Route, Routes } from "react-router-dom";
import Test from "./components/test/Test";
// import Landing from "containers/landing/Landing";

import Home from "./containers/home";
import MyPage from "containers/myPage/MyPage";
import Openvidu from "containers/Openvidu/index";
// import ChatList from "containers/chatList/ChatList";
import ChatRoom from "containers/chatRoom/ChatRoom";
import InGame from "containers/inGame/InGame";
// import LandingStart from "containers/landing/LandingStart/LandingStart";
// import LandingLogin from "containers/landing/LandingLogin/LandingLogin";
import LandingContainer from "containers/landingContainer/Landing";
import InputContainer from "containers/inputContainer";

const Router = () => {
  return ( //localhost:3000
    <Routes>
      <Route path="" element={<LandingContainer />} />
      {/* <Route path="/start" element={<LandingStart />} />
      <Route path="/login" element={<LandingLogin />} /> */}
      <Route path="/input" element={<InputContainer />} />
      <Route path="/home" element={<Home />} />
      <Route path="/test" element={<Test />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/meeting" element={<Openvidu />} />
      <Route path="/chatRoom/:nickname" element={<ChatRoom />} />
      {/* <Route path="/chatList" element={<ChatList />} /> */}
      <Route path="/inGame" element={<InGame />} />
    </Routes>
  );
};
export default Router;
