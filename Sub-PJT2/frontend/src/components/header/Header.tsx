import * as S from "./Header.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import tmpLogo from "asset/img/logo/2.png";
import exitImg from "asset/img/icons8-exit-50.png";
import { Link } from "react-router-dom";

const Header = () => {
  const theme: themeProps = useTheme();

  const handleClickExit = () => {
    window.location.replace("/ingame");
  };

  return (
    <S.Header theme={theme}>
      <S.Exit src={exitImg} alt="exit" onClick={handleClickExit}></S.Exit>
      <S.Logo src={tmpLogo} alt="logo"></S.Logo>
    </S.Header>
  );
};

export default Header;
