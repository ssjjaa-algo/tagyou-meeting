import * as S from "./Landing.styled";
import { Link } from "react-router-dom";
import Landing from "components/landing";
import tmpLogo from "../../asset/img/logo/2.png";
import { useState } from "react";

const LandingContainer = () => {
  return (
    <>
      <S.Nav>
        <S.Img src={tmpLogo} height={28}></S.Img>
      </S.Nav>
      <S.Container>
        <S.LogoBox>.</S.LogoBox>
        <S.TextBox>
          <Landing />
          <S.Btn content={"시작하기"}></S.Btn>
        </S.TextBox>
      </S.Container>
    </>
  );
};

export default LandingContainer;
