import * as S from "./Home.styled";

import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";

const Home = () => {
  const theme: themeProps = useTheme();
  return (
    <S.Container>
      <S.DeepText theme={theme}>Deep</S.DeepText>
      <S.MidText theme={theme}>Mid</S.MidText>
      <S.LightText theme={theme}>Light</S.LightText>
    </S.Container>
  );
};

export default Home;
