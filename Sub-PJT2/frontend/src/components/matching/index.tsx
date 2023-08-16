import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import * as S from "./matching.styled";
import "./index.css";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { TokenValue } from "atoms/atoms";
import { Cookies } from "react-cookie";
import { GroupModal } from "components/modal/groupModal";

type MatchingProps = {
  setShowMatching: (value: boolean) => void;
};

export const Matching = ({ setShowMatching }: MatchingProps) => {
  const handleCloseMatching = () => {
    setShowMatching(false);
  };
  const theme: themeProps = useTheme();
  const [roomId, setRoomId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const cookies = new Cookies();
  const [token, setToken] = useRecoilState(TokenValue);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleFirstClick = async () => {
    setIsLoading(true);
    const postOneRoom = async () => {
      fetch(`${process.env.REACT_APP_BASE_URL}/rooms/one`, {
        method: "POST",
        headers: {
          Auth: token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          let roomId = res.roomId;
          fetch(`${process.env.REACT_APP_BASE_URL}/rooms/one/${roomId}`, {
            method: "POST",
            headers: {
              Auth: token,
              "Content-Type": "application/json",
            },
          }).then((res) => (window.location.href = `/meeting/${roomId}`));
        });
    };
    postOneRoom();
  };

  const handleSecondClick = async () => {
    setIsLoading(true);
    setShowModal(true);
  };

  return (
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

              {showModal && <GroupModal setShowModal={() => setShowModal} />}
            </>
          )}
        </S.ButtonContainer>
      </S.ModalContent>
    </S.ModalWrapper>
  );
};
