import * as S from "./LandingLogin.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import kakaoLogo from "asset/img/kakaologo.png";

const LandingLogin = () => {
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
          <S.LoginBox theme={theme}>
            <S.StartBoxTitle>로그인</S.StartBoxTitle>
            <S.KaKaoLoginBtn
              style={pointerShape}
              onMouseOver={handleHover}
              onMouseLeave={handleHoverOut}
            >
              <S.kakaologo src={kakaoLogo}></S.kakaologo>
              카카오계정으로 로그인
            </S.KaKaoLoginBtn>
            <S.StartSectionText>
              <S.GoLoginText>
                계정이 없나요?
                <Link to="/start">
                  <S.GoRegisterBtn
                    style={pointerShape}
                    onMouseOver={handleHover}
                    onMouseLeave={handleHoverOut}
                  >
                    가입하기
                  </S.GoRegisterBtn>
                </Link>
              </S.GoLoginText>
            </S.StartSectionText>
          </S.LoginBox>
        </S.LandingBody>
      </S.Container>
    </div>
  );
};

export default LandingLogin;
