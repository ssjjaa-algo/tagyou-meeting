import * as S from "./RightContainer.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { TokenValue } from "atoms/atoms";
import { ReactNode, useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useRecoilState } from "recoil";

type RightContinaerProp = {
  children?: JSX.Element | JSX.Element[] | ReactNode;
};

const RightContainer = ({ children }: RightContinaerProp) => {
  const theme: themeProps = useTheme();
  return (
    <>
      <S.Container className="right_container" theme={theme}>
        {children}
      </S.Container>
    </>
  );
};

export default RightContainer;
