import WebSocketProvider from "webSocket/WebSocketProvider";
import RightContainer from "containers/rightContainer/rightConatiner-inGameChat/InGameChat";
import LeftContainer from "containers/leftContainer/game/catchMind/CatchMind";
import styled from "@emotion/styled";

function InGame() {
  return (
    <div>
      <Container>
        <LeftContainer />
        <WebSocketProvider>
          <RightContainer />
        </WebSocketProvider>
      </Container>
    </div>
  );
}

const Container = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100vw;
  min-width: fit-content;
`;

export default InGame;
