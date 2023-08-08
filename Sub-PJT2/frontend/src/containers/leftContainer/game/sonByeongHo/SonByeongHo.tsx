import * as S from "./SonByeongHo.styled";
import { useRef, useState, useCallback, useEffect } from "react";
import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { useRecoilState } from "recoil";
import { InGameChatStatus } from "atoms/atoms";
import "css/sonByeongHo.css";
import lifeImg from "asset/img/icons8-heart-40.png";

const SonByeongHo = () => {
  const theme: themeProps = useTheme();

  const [inGameChatStatus, setInGameChatStatus] =
    useRecoilState(InGameChatStatus);

  // 양심선언 버튼 누를 경우 유의 사항
  // 1. "각 개인의" 목숨 카운트가 줄어야 함 => 각 개인의 정보를 prop으로 가져와야할듯
  //     아니면 이거도 webSocket을 이용해야하나?
  //     양심선언 버튼을 누를때마다 socket에 send하고 같은 방에 연결되어 있는 모든 사용자에게
  //     모두 같은 정보를 뿌려야 하므로 webSocket을 사용하는 것이 맞을듯
  //     아니면 webRTC? 일단은 webSocket으로 진행해봐야겠다.
  // 2. 한 차례당 한번씩만 눌리게 해야됨
  // 3. 목숨 카운트가 0이 된 사람이 한명이라도 있을 경우 게임 종료
  // 4. 목숨 카운트가 0이 된 사람이 나온 직후가 아닌 그 턴이 종료 된 후에 게임 종료

  const [player1LifeCnt, setPlayer1LifeCnt] = useState(5);
  const [player2LifeCnt, setPlayer2LifeCnt] = useState(5);
  const [player3LifeCnt, setPlayer3LifeCnt] = useState(5);
  const [player4LifeCnt, setPlayer4LifeCnt] = useState(5);
  const [player5LifeCnt, setPlayer5LifeCnt] = useState(5);
  const [player6LifeCnt, setPlayer6LifeCnt] = useState(5);

  const playerLifeCalc = (playerLifeCnt: number) => {
    const result = [];
    for (let i = 0; i < playerLifeCnt; i++) {
      result.push(<S.Life src={lifeImg} alt="Life" key={i}></S.Life>);
    }
    return result;
  };

  const handleClickConfess = () => {
    setPlayer1LifeCnt(player1LifeCnt - 1);
  };

  const [turnEnd, setTurnEnd] = useState<boolean>(false);

  // 매 턴이 종료되는 시점은
  // 1. 모든 사람이 양심 선언을 누르거나
  // 2. 10초가 지날 경우

  // 매 턴이 종료되는 시점에
  if (turnEnd) {
    // player 중 한명이라도 lifeCnt가 0이라면
    if (
      !player1LifeCnt ||
      !player2LifeCnt ||
      !player3LifeCnt ||
      !player4LifeCnt ||
      !player5LifeCnt ||
      !player6LifeCnt
    ) {
      // 게임 종료
    } else {
      // 턴 끝났다는 표시 false로 바꾸기
      setTurnEnd(false);
    }
  }

  return (
    <Container
      className={!inGameChatStatus ? "Container-Son" : "Container-Son-withChat"}
    >
      <S.Container>
        <S.PlayerVidBundle>
          <S.PlayerVid>
            <S.LifeContainer>{playerLifeCalc(player1LifeCnt)}</S.LifeContainer>
          </S.PlayerVid>
          <S.PlayerVid>
            <S.LifeContainer>{playerLifeCalc(player2LifeCnt)}</S.LifeContainer>
          </S.PlayerVid>
          <S.PlayerVid>
            <S.LifeContainer>{playerLifeCalc(player3LifeCnt)}</S.LifeContainer>
          </S.PlayerVid>
        </S.PlayerVidBundle>
        <S.Middle>
          <S.Saying theme={theme}>
            세상에서 가장 품위있는 소리는 침착한 양심의 소리이다. - 셰익스피어
          </S.Saying>
          <S.Confess theme={theme} onClick={handleClickConfess}>
            양심 선언
          </S.Confess>
        </S.Middle>
        <S.PlayerVidBundle>
          <S.PlayerVid>
            <S.LifeContainer>{playerLifeCalc(player4LifeCnt)}</S.LifeContainer>
          </S.PlayerVid>
          <S.PlayerVid>
            <S.LifeContainer>{playerLifeCalc(player5LifeCnt)}</S.LifeContainer>
          </S.PlayerVid>
          <S.PlayerVid>
            <S.LifeContainer>{playerLifeCalc(player6LifeCnt)}</S.LifeContainer>
          </S.PlayerVid>
        </S.PlayerVidBundle>
      </S.Container>
    </Container>
  );
};

const Container = styled.div`
  /* border: solid green 5px; */
  display: flex;
  flex-direction: row;
  height: 100vh;
  transition: all 1s;
  min-height: fit-content;
  min-width: fit-content;
`;

export default SonByeongHo;
