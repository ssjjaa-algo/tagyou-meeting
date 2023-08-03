import * as S from "./Intro.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
// import { useEffect, useState } from "react";

const Intro = (content: any) => {
  const theme: themeProps = useTheme();
  
  function edit() {
    console.log(content)    
  }

  return (
    <>
    
    <button onClick={edit}><S.FavoriteIconStyled theme={theme}/></button>
    <S.Content></S.Content>
    
    </>
  )
}

export default Intro;