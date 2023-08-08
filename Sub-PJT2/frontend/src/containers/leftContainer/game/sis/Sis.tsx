import * as S from "./Sis.styled";
import { useRef, useState, useCallback, useEffect } from "react";
import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import brush from "asset/img/brush.png";
import { useRecoilState } from "recoil";
import { InGameChatStatus } from "atoms/atoms";
import "css/sis.css";

const Sis = () => {
  const theme: themeProps = useTheme();

  const [inGameChatStatus, setInGameChatStatus] =
    useRecoilState(InGameChatStatus);
  return (
    <Container
      className={!inGameChatStatus ? "Container-Sis" : "Container-Sis-withChat"}
    >
      <S.Container>
        <S.PlayerVidBundle>
          <S.PlayerVid></S.PlayerVid>
          <S.PlayerVid></S.PlayerVid>
          <S.PlayerVid></S.PlayerVid>
        </S.PlayerVidBundle>
        <S.Center theme={theme}>
          <S.CenterVid></S.CenterVid>
          <S.QuizContainer theme={theme}>
            <S.QuizTitle>제시어</S.QuizTitle>
            <S.QuizWord>새색시</S.QuizWord>
          </S.QuizContainer>
        </S.Center>
        <S.PlayerVidBundle>
          <S.PlayerVid></S.PlayerVid>
          <S.PlayerVid></S.PlayerVid>
          <S.PlayerVid></S.PlayerVid>
        </S.PlayerVidBundle>
      </S.Container>
    </Container>
  );
};

const Container = styled.div`
  /* border: solid green 5px; */
  display: flex;
  flex-direction: row;
  /* height: calc(100vh - 3rem); */
  transition: all 1s;
  min-height: fit-content;
  min-width: fit-content;
`;

export default Sis;
