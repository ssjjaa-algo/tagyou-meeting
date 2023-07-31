import * as S from "./Landing.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { useState } from "react";

const Landing = () => {
  const theme: themeProps = useTheme();

  const [hover, setHover] = useState<boolean>(false);
  const [pointerShape, setPointerShape] = useState({ cursor: "" });

  const handleHover = () => {
    setHover(!hover);
    setPointerShape({ cursor: "pointer" });
  };
  const handleHoverOut = () => {
    setHover(!hover);
    setPointerShape({ cursor: "" });
  };

  return (
    <S.Container>
      <S.LandingBody>
        <S.LandingTitle>
          <S.LandingTitle1>친구에서 연인으로</S.LandingTitle1>
          <S.LandingTitle2>연인에서 가족으로</S.LandingTitle2>
        </S.LandingTitle>
        <S.StartSection>
          <S.StartBtn
            theme={theme}
            style={pointerShape}
            onMouseOver={handleHover}
            onMouseLeave={handleHoverOut}
          >
            시작하기
          </S.StartBtn>
          <S.StartSectionText>
            이미 저희의 소중한 가족이신가요?
            <S.GoLoginBtn
              style={pointerShape}
              onMouseOver={handleHover}
              onMouseLeave={handleHoverOut}
            >
              로그인
            </S.GoLoginBtn>
            하러 가기
          </S.StartSectionText>
        </S.StartSection>
      </S.LandingBody>
    </S.Container>
  );
};

export default Landing;
