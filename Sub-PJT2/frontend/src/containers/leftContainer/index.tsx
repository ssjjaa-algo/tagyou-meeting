import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { useRecoilState } from "recoil";
import { IsDark, IsOpen } from "../../atoms/atoms";
import * as S from "./LeftContainer.styled";
import { leftContainerProprs } from "../../types/leftContainerProprs";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Profile from "components/profile";
import FriendContainer from "containers/friendContainer";

const LeftContainer = ({ imgSrc, name, age }: leftContainerProprs) => {
  const [isOpen, setIsOpen] = useRecoilState(IsOpen);
  const [isDark, setIsDark] = useRecoilState(IsDark);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const theme: themeProps = useTheme();

  const style: React.CSSProperties = {
    backgroundColor: theme.bg.deep,
  };

  return (
    <>
      <S.HiddenSection theme={theme} onClick={toggleDrawer}>
        {isOpen ? (
          <S.ArrowBackIosIconStyled theme={theme} />
        ) : (
          <S.ArrowForwardIosIconStyled theme={theme} />
        )}
      </S.HiddenSection>
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

        <Profile imgSrc={imgSrc} name={name} age={age} />

        <S.ListBox>
          <S.List theme={theme}>
            <S.HomeIconStyled theme={theme} />
            <S.ListText>홈</S.ListText>
          </S.List>
          <S.List theme={theme}>
            <S.PlayCircleOutlineIconStyled theme={theme} />{" "}
            <S.ListText>미팅시작</S.ListText>
          </S.List>
          <S.List theme={theme}>
            <S.GroupIconStyled theme={theme} />
            <S.ListText>친구목록</S.ListText>
          </S.List>
        </S.ListBox>
        <S.FootBox theme={theme}>로그아웃</S.FootBox>
      </Drawer>
      <FriendContainer />
    </>
  );
};

export default LeftContainer;
