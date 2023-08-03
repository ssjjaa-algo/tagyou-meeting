import * as S from "./Intro.styled";
import { themeProps } from "@emotion/react";
import { getProfileProps } from "types/types";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const Intro = () => {
  const theme: themeProps = useTheme();
  
  function edit() {
    console.log('edit')    
  }

  return (
    <>
    
    <button onClick={edit}><S.FavoriteIconStyled theme={theme}/></button>
    <S.Content></S.Content>
    
    </>
  )
}

export default Intro;