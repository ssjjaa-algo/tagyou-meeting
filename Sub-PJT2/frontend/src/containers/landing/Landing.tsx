import * as S from "./Landing.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  const theme: themeProps = useTheme();

  const [pointerShape, setPointerShape] = useState({ cursor: "" });

  const handleHover = () => {
    setPointerShape({ cursor: "pointer" });
  };
  const handleHoverOut = () => {
    setPointerShape({ cursor: "" });
  };

  return (
    <div>
      <S.Container>
        <S.LandingBody>
          <S.LandingTitle>
            <S.LandingTitle1>친구에서 연인으로</S.LandingTitle1>
            <S.LandingTitle2>연인에서 가족으로</S.LandingTitle2>
          </S.LandingTitle>
          <S.StartSection>
            <Link to="/start">
              <S.StartBtn
                theme={theme}
                style={pointerShape}
                onMouseOver={handleHover}
                onMouseLeave={handleHoverOut}
              >
                시작하기
              </S.StartBtn>
            </Link>
            <S.StartSectionText>
              이미 저희의 소중한 가족이신가요?
              <Link to="/login">
                <S.GoLoginBtn
                  style={pointerShape}
                  onMouseOver={handleHover}
                  onMouseLeave={handleHoverOut}
                >
                  로그인
                </S.GoLoginBtn>
              </Link>
              하러 가기
            </S.StartSectionText>
          </S.StartSection>
        </S.LandingBody>
      </S.Container>
    </div>
  );
};

export default Landing;
