// import WebSocketProvider from "webSocket/WebSocketProvider";
import RightContainer from "containers/rightContainer/rightConatiner-inGameChat/InGameChat";
// import LeftContainer from "containers/leftContainer/game/catchMind/CatchMind";
import LeftContainer from "containers/leftContainer/game/sonByeongHo/SonByeongHo";
// import LeftContainer from "containers/leftContainer/game/sis/Sis";
import styled from "@emotion/styled";
import Header from "components/header/Header";

// props로 게임이 뭔지 받아와야할듯
function InGame() {
  return (
    <div>
      <Header />
      <Container>
        <LeftContainer />
        {/* <WebSocketProvider> */}
        <RightContainer />
        {/* </WebSocketProvider> */}
      </Container>
    </div>
  );
}

const Container = styled.div`
  /* border: solid yellow; */
  display: flex;
  flex-direction: row;
  margin-top: 4rem;
  width: 100vw;
  height: calc(100vh - 4rem);
  /* min-height: fit-content !important; */
  min-width: fit-content !important;
  /* justify-content: space-between; */
`;

export default InGame;
