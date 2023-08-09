import RightContainer from "containers/rightContainer/rightConatiner-inGameChat/InGameChat";
import * as S from "./Meeting.styled";
import CatchMind from "containers/inGame/catchMind";
import SonByeonHo from "containers/inGame/sonByeongHo";
import Sis from "containers/inGame/sis";
import styled from "@emotion/styled";
import Header from "components/header/Header";
import { useState } from "react";

function Meeting() {
  const [start, setStart] = useState(false);
  const [selectedGame, setSelectedGame] = useState("");

  const renderSelectedGame = () => {
    if (selectedGame === "catchMind") {
      return <CatchMind />;
    } else if (selectedGame === "sonByeonHo") {
      return <SonByeonHo />;
    } else if (selectedGame === "sis") {
      return <Sis />;
    }
    // 기본적으로 아무 것도 렌더링하지 않음
    return null;
  };

  return (
    <div>
      <Header />
      <Container>
        {!start && (
          <div>
            <select
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
            >
              <option value={"catchMind"}>캐치마인드</option>
              <option value={"sonByeonHo"}>손병호게임</option>
              <option value={"sis"}>고요속의 외침</option>
            </select>
            <button onClick={() => setStart(true)}>게임 시작</button>
          </div>
        )}
        {start && renderSelectedGame()}
        <RightContainer />
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 4rem;
  width: 100vw;
  height: calc(100vh - 4rem);
  min-width: fit-content !important;
`;

export default Meeting;
