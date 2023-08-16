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
          if (res['roomId'] !== undefined) {
          let roomId = res['roomId'];      
          fetch(`${process.env.REACT_APP_BASE_URL}/rooms/one/${roomId}`, {
            method: "POST",
            headers: {
              Auth: token,
              "Content-Type": "application/json",
            }}
          )
          .then((res) => res.json())
          .then((res) => {
            const updatedRoomInfo = {
              roomType: res['roomType'],
              roomId: res['roomId'],
              sessionId: res['sessionId'],
              maleUserName: res['maleUserName'],
              femaleUserName: res['femaleUserName'],
            };
            
            setRoomInfo(updatedRoomInfo);
            localStorage.setItem('roomInfo', JSON.stringify(updatedRoomInfo));
            })
          .then(()=> window.location.href = `/meeting/${roomId}`)
          }
      })
    };
    postOneRoom();
  };

<<<<<<< HEAD
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
=======
  const handleSecondClick = () => {
    // setIsLoading(true);
    console.log("hhello");
    setShowModal(true);
    //자식에게까지 상속되는 것 같다
    // setShowMatching(false);
    console.log("이건 되남");
  };

  useEffect(() => {
    console.log("showmodal", showModal);
  }, [showModal]);

  return (
    <>
      <S.ModalWrapper onClick={handleCloseMatching}>
        <S.ModalContent onClick={(e) => e.stopPropagation()} theme={theme}>
          <S.CloseIconStyled onClick={handleCloseMatching} />
          <S.ButtonContainer>
            {isLoading ? (
              <>
                <div className="lds-heart">
                  <div></div>
                </div>
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
            {showModal && <GroupModal setShowModal={setShowModal} />}
          </S.ButtonContainer>
        </S.ModalContent>
      </S.ModalWrapper>
    </>
>>>>>>> 2e7e110a764012e0de7f7c287af2fbe7b7fcf46f
  );
};
