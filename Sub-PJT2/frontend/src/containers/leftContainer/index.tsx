import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import * as S from "./LeftContainer.styled";
import { leftContainerProprs } from "../../types/leftContainerProprs";
import { useRecoilState } from "recoil";
import { IsDark, IsOpen } from "../../atoms/atoms";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

const LeftContainer = ({ imgSrc, name, age }: leftContainerProprs) => {
  const [isOpen, setIsOpen] = useRecoilState(IsOpen);
  const [isDark, setIsDark] = useRecoilState(IsDark);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const theme: themeProps = useTheme();

  const style: React.CSSProperties = {
    backgroundColor: theme.bgColor,
  };

  return (
    <>
      <span onClick={toggleDrawer}>btn</span>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        overlayOpacity={0}
        style={style}
      >
        <S.BtnBox>
          <button onClick={() => setIsDark((cur) => !cur)}>
            {isDark ? (
              <S.LightModeIconStyled theme={theme} />
            ) : (
              <S.DarkModeIconStyled theme={theme} />
            )}
          </button>
          <S.ArrowBtn onClick={() => setIsOpen((cur) => !cur)}>
            {isOpen ? (
              <S.ArrowBackIosIconStyled theme={theme} />
            ) : (
              <S.ArrowForwardIosIconStyled theme={theme} />
            )}
          </S.ArrowBtn>
        </S.BtnBox>
        <S.Profile>
          <S.ProfileImgBox>
            <S.ProfileImg src={imgSrc} width={80} alt="profileImg" />
          </S.ProfileImgBox>
          <S.ProfileText>
            <S.Name theme={theme}>{name}</S.Name>
            <S.Age theme={theme}>만 {age}세</S.Age>
          </S.ProfileText>
        </S.Profile>
        <S.ListBox>
          <S.List theme={theme}>
            <S.HomeIconStyled theme={theme} />홈
          </S.List>
          <S.List theme={theme}>
            <S.PlayCircleOutlineIconStyled theme={theme} /> 미팅 시작
          </S.List>
          <S.List theme={theme}>
            <S.GroupIconStyled theme={theme} />
            친구 목록
          </S.List>
        </S.ListBox>
        <S.FootBox theme={theme}>로그아웃</S.FootBox>
      </Drawer>
    </>
  );
};

export default LeftContainer;
