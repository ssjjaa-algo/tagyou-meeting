import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import * as S from "./matching.styled";
import './index.css'
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { RoomInfo, TokenValue } from "atoms/atoms";
import { Cookies } from "react-cookie";

type MatchingProps = {
  handleOnClick: () => void;
  setShowMatching: (value: boolean) => void;
};

export const Matching = ({
  // handleOnClick,
  setShowMatching,
}: MatchingProps) => {
  const handleCloseMatching = () => {
    setShowMatching(false);
  };
  const theme: themeProps = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const cookies = new Cookies();
  const [token, setToken] = useRecoilState(TokenValue);
  const [roomInfo, setRoomInfo] = useRecoilState(RoomInfo);
  
  const handleFirstClick = async() => {
    setIsLoading(true);
    const postOneRoom = async () => {
      fetch(`${process.env.REACT_APP_BASE_URL}/rooms/one`, {
        method: "POST",
        headers: {
          Auth: token,
          "Content-Type": "application/json",
        },
      })
        .then((res)=> res.json())
        .then((res)=> {
          console.log(res.data)
          if (res.data !== undefined) {
          let roomId = res.data.roomId;      
          fetch(`${process.env.REACT_APP_BASE_URL}/rooms/one/${roomId}`, {
            method: "POST",
            headers: {
              Auth: token,
              "Content-Type": "application/json",
            }}
          )
          .then((res) => res.json())
          .then((res) => {
            // Update the RoomInfo atom
              setRoomInfo({
                roomType: res.data.roomType,
                roomId: res.data.roomId,
                sessionId: res.data.sessionId,
                maleUserName: res.data.maleUserName,
                femaleUserName: res.data.femaleUserName,
              })})
              .then(()=> console.log("TEEEST", roomInfo))
              // window.location.href = `/meeting/${roomId}`
          }
      })
    };
    postOneRoom();
  };

  const handleSecondClick = async () => {
    setIsLoading(true);
  };

  return (
    <S.ModalWrapper onClick={handleCloseMatching}>
      <S.ModalContent onClick={(e) => e.stopPropagation()} theme={theme}>
        <S.CloseIconStyled onClick={handleCloseMatching} />
        <S.ButtonContainer>
          {isLoading ? (
            <>
              <div className="lds-heart"><div></div></div>
              <S.Loading theme={theme}>로딩 중...</S.Loading>
            </>
          ) : (
            <>
              <S.Button theme={theme} onClick={handleFirstClick}>
                일대일 매칭
              </S.Button>
              <S.Button theme={theme} onClick={handleSecondClick}>
                다대다 매칭
              </S.Button>
            </>
          )}
        </S.ButtonContainer>
      </S.ModalContent>
    </S.ModalWrapper>
  );
};
