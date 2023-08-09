import RightContainer from "containers/rightContainer/rightConatiner-inGameChat/InGameChat";
import * as S from "./Meeting.styled";
import CatchMind from "containers/inGame/catchMind";
import SonByeonHo from "containers/inGame/sonByeongHo";
import Sis from "containers/inGame/sis";
import { useState } from "react";
import Header from "components/header/Header";
import { GameStart as GameStartAtom } from "atoms/atoms";
import { useRecoilState } from "recoil";


const Meeting = () => {
  const [GameStart, setGameStart] = useRecoilState(GameStartAtom);
  const [selectedGame, setSelectedGame] = useState("");

  const renderSelectedGame = () => {
    if (selectedGame === "catchMind") {
      return <CatchMind />;
    } else if (selectedGame === "sonByeonHo") {
      return <SonByeonHo />;
    } else if (selectedGame === "sis") {
      return <Sis />;
    }
  };

  return (
    <S.Container>
      <Header />
        {!GameStart ? (
          <S.Container>
          <S.InnerContainer>
            <S.PlayerVidBundle>
              <S.PlayerVid>
              </S.PlayerVid>
              <S.PlayerVid>
              </S.PlayerVid>
              <S.PlayerVid>
              </S.PlayerVid>
            </S.PlayerVidBundle>
            <S.Middle>
              <select
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
              >
                <option value="">게임을 선택하세요</option>
                <option value={"catchMind"}>캐치마인드</option>
                <option value={"sonByeonHo"}>손병호게임</option>
                <option value={"sis"}>고요속의 외침</option>
              </select>
              <button onClick={() => setGameStart(true)}>게임 시작</button>
            </S.Middle>
            <S.PlayerVidBundle>
              <S.PlayerVid>
              </S.PlayerVid>
              <S.PlayerVid>
              </S.PlayerVid>
              <S.PlayerVid>
              </S.PlayerVid>
            </S.PlayerVidBundle>
          </S.InnerContainer>
          </S.Container>
          ) : (
            renderSelectedGame()
            )}
      <RightContainer />
    </S.Container>

  );
}

export default Meeting;
