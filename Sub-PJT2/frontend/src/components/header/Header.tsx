import * as S from "./Header.styled";
import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import tmpLogo from "asset/img/logo/2.png";

const Header = () => {
  const theme: themeProps = useTheme();

  return (
    <S.Header theme={theme}>
      <S.Logo src={tmpLogo} alt="logo"></S.Logo>
    </S.Header>
  );
};

export default Header;
