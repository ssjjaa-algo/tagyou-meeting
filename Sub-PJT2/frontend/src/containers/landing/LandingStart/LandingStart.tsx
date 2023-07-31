import * as S from "./LandingStart.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { useState } from "react";
import kakaoLogo from "asset/img/kakaologo.png";
import { Link } from "react-router-dom";

const LandingStart = () => {
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
          <S.StartBox theme={theme}>
            <S.StartBoxTitle>시작하기</S.StartBoxTitle>
            <S.KaKaoStartBtn
              style={pointerShape}
              onMouseOver={handleHover}
              onMouseLeave={handleHoverOut}
            >
              <S.kakaologo src={kakaoLogo}></S.kakaologo>
              카카오로 시작하기
            </S.KaKaoStartBtn>
            <S.StartSectionText>
              이미 저희의 소중한 가족이신가요?
              <S.GoLoginText>
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
              </S.GoLoginText>
            </S.StartSectionText>
          </S.StartBox>
        </S.LandingBody>
      </S.Container>
    </div>
  );
};

export default LandingStart;
