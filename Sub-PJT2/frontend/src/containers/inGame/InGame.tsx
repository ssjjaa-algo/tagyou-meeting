// import WebSocketProvider from "webSocket/WebSocketProvider";
import RightContainer from "containers/rightContainer/rightConatiner-inGameChat/InGameChat";
// import LeftContainer from "containers/leftContainer/game/catchMind/CatchMind";
import LeftContainer from "containers/leftContainer/game/sonByeongHo/SonByeongHo";
import styled from "@emotion/styled";

// props로 게임이 뭔지 받아와야할듯
function InGame() {
  return (
    <div>
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
  width: 100vw;
  height: 100vh;
  min-height: fit-content !important;
  min-width: fit-content !important;
  /* justify-content: space-between; */
`;

export default InGame;
