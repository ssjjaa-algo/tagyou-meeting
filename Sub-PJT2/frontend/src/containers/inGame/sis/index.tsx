import * as S from "./Sis.styled";
import { useRef, useState, useCallback, useEffect } from "react";
import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import brush from "asset/img/brush.png";
import { useRecoilState } from "recoil";
import { InGameChatStatus, RoomInfo } from "atoms/atoms";
import "css/sis.css";
import UserVideoComponent from "containers/openvidu/UserVideoComponent";

interface CatchMindProps {
  publisher: any; // publisher의 타입을 여기에 정확히 지정해주세요
  subscribers: any[]; // subscribers의 타입을 여기에 정확히 지정해주세요
}

const Sis = ({ publisher, subscribers }: CatchMindProps) => {
  const theme: themeProps = useTheme();
  const [roomInfo, setRoomInfo] = useRecoilState(RoomInfo); 
  
  const [inGameChatStatus, setInGameChatStatus] =
    useRecoilState(InGameChatStatus);
  return (
    <Container
      className={!inGameChatStatus ? "Container-Sis" : "Container-Sis-withChat"}
    >
      <S.Container>
        {/* 사람 영상 뜰 자리 */}
        { roomInfo.roomType === "One" ? (
          <S.PlayerVidBundle>
            <S.PlayerVid><UserVideoComponent streamManager={publisher} /></S.PlayerVid>
          </S.PlayerVidBundle>
        ) : (
          <S.PlayerVidBundle>
            <S.PlayerVid><UserVideoComponent streamManager={publisher} /></S.PlayerVid>
            <S.PlayerVid><UserVideoComponent streamManager={publisher} /></S.PlayerVid>
            <S.PlayerVid><UserVideoComponent streamManager={publisher} /></S.PlayerVid>
          </S.PlayerVidBundle>
        )
        }
        <S.Center theme={theme}>
          <S.CenterVid></S.CenterVid>
          <S.QuizContainer theme={theme}>
            <S.QuizTitle>제시어</S.QuizTitle>
            <S.QuizWord>새색시</S.QuizWord>
          </S.QuizContainer>
        </S.Center>
        {/* 사람 영상 뜰 자리 */}
        <S.PlayerVidBundle>
          {subscribers.map((sub, i) => {
            return(
              <S.PlayerVid><UserVideoComponent streamManager={sub} /></S.PlayerVid>
              )})}
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
