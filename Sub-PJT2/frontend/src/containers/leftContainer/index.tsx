import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import * as S from "./LeftContainer.styled";

const LeftContainer = () => {
  const curTheme: themeProps = useTheme();
  console.log(curTheme);
  return (
    <div>
      <S.Btn theme={curTheme}>hello</S.Btn>
    </div>
  );
};

export default LeftContainer;
