import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { useRecoilState } from "recoil";
import { IsDark, IsOpen } from "../../atoms/atoms";
import * as S from "./LeftContainer.styled";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Profile from "components/profile";
import FriendContainer from "containers/friendContainer";
import { leftContainerProprs } from "types/types";
import { useEffect, useState } from "react";
import { Modal } from "components/modal";

const LeftContainer = ({ imgSrc, name, age }: leftContainerProprs) => {
  const [isOpen, setIsOpen] = useRecoilState(IsOpen);
  const [isDark, setIsDark] = useRecoilState(IsDark);
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const rightContainer = document.querySelector(
      ".right_container"
    ) as HTMLElement;
    if (rightContainer instanceof Element) {
      // console.log("open", isOpen);
      rightContainer.style.width = isOpen
        ? "calc(100vw - 500px)"
        : "calc(100vw)";
    }
  }, [isOpen]);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const theme: themeProps = useTheme();

  useEffect(() => {
    console.log("theme", theme);
    console.log("aa", theme.bg.deep);
  }, [theme]);

  const style: React.CSSProperties = {
    backgroundColor: `${theme.bg.deep}`,
  };

  return (
    <>
      {!isOpen && (
        <S.HiddenSection theme={theme} onClick={toggleDrawer}>
          {isOpen ? (
            <S.ArrowBackIosIconStyled theme={theme} />
          ) : (
            <S.ArrowForwardIosIconStyled theme={theme} />
          )}
        </S.HiddenSection>
      )}
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
            <S.HomeIconStyled theme={theme} onClick={()=>{window.location.replace("/home");}}/>
            <S.ListText onClick={()=>{window.location.replace("/home");}}>홈</S.ListText>
          </S.List>
          <S.List theme={theme}>
            <S.PlayCircleOutlineIconStyled theme={theme} onClick={()=>{window.location.replace("/meeting");}}/>{" "}
            <S.ListText onClick={()=>{window.location.replace("/meeting");}}>미팅 시작</S.ListText>
          </S.List>
        </S.ListBox>
        <S.FootBox
          theme={theme}
          onClick={() => {
            setShowModal(true);
            setIsLogout(true);
          }}
        >
          로그아웃
        </S.FootBox>
      </Drawer>
      <FriendContainer />

      {showModal && (
        <Modal
          handleOnClick={() => console.log("logout")}
          setShowModal={setShowModal}
          formType="logout"
        />
      )}
    </>
  ); 
};

export default LeftContainer;
