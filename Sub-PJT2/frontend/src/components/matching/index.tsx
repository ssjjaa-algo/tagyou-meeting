import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import * as S from "./matching.styled";
import './index.css'
import { useState } from "react";

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

  const handleButtonClick = async () => {
    setIsLoading(true);
    // await handleOnClick();
    // setIsLoading(false);
    // handleCloseMatching();
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
              <S.Button theme={theme} onClick={handleButtonClick}>
                일대일 매칭
              </S.Button>
              <S.Button theme={theme} onClick={handleButtonClick}>
                다대다 매칭
              </S.Button>
            </>
          )}
        </S.ButtonContainer>
      </S.ModalContent>
    </S.ModalWrapper>
  );
};
