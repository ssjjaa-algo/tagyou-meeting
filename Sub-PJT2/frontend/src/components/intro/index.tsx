import * as S from "./Intro.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
// import { useEffect, useState } from "react";

const Intro = (content: any) => {
  const theme: themeProps = useTheme();
  
  function edit() {
    console.log("클릭 시 content.data 변경되도록 수정할 예정입니다")    
  }

  return (
    <>
    
    <button onClick={edit}><S.FavoriteIconStyled theme={theme}/></button>
    <div>{content.data}</div>
    
    </>
  )
}

export default Intro;