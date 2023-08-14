import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import * as S from "./matching.styled";
import './index.css'
import { useEffect, useState } from "react";
import axios from 'axios';
import { useRecoilState } from "recoil";
import { TokenValue } from "atoms/atoms";
import { Cookies } from "react-cookie";

type MatchingProps = {
  handleOnClick: () => void;
  setShowMatching: (value: boolean) => void;
};

export const Matching = ({
  handleOnClick,
  setShowMatching,
}: MatchingProps) => {
  const handleCloseMatching = () => {
    setShowMatching(false);
  };
  const theme: themeProps = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const cookies = new Cookies();
  const [token, setToken] = useRecoilState(TokenValue);
  
  useEffect(() => {
    setToken(cookies.get("Auth"));
  }, [cookies.get("Auth")]);

  const handleFirstClick = async () => {
    try {
      const response = await axios.post('http://localhost:9999/api/rooms/one', {
        headers: {
          Auth: token,
        }
      })
        console.log('POST 요청 성공:', response.data);
        setIsLoading(false);
    } catch (error) {
      // 요청이 실패했을 때의 동작을 추가합니다.
      console.error('POST 요청 실패:', error);
      setIsLoading(false);
    }
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
