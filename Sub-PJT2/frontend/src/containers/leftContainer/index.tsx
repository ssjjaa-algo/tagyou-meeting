import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { useRecoilState } from "recoil";
import {
  IsDark,
  IsOpen,
  ProfileImgSrc,
  TokenValue,
  UserInfo,
} from "../../atoms/atoms";
import * as S from "./LeftContainer.styled";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Profile from "components/profile";
import FriendContainer from "containers/friendContainer";
import { useEffect, useState } from "react";
import { Modal } from "components/modal";
import { Cookies } from "react-cookie";
import { Matching } from "components/matching";

const LeftContainer = () => {
  const [isOpen, setIsOpen] = useRecoilState(IsOpen);
  const [isDark, setIsDark] = useRecoilState(IsDark);
  const [token, setToken] = useRecoilState(TokenValue);
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const cookies = new Cookies();
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);
  const [authToken, setAuthToken] = useState<string>("");
  const [imgSrc, setImgSrc] = useRecoilState<string>(ProfileImgSrc);
  const [showMatching, setShowMatching] = useState<boolean>(false);
  useEffect(() => {
    console.log("leftcontainer");
  }, []);

  useEffect(() => {
    setAuthToken(cookies.get("Auth"));
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      console.log("left_container에서 받는 localToken", authToken);
      fetch(`${process.env.REACT_APP_BASE_URL}/users/mypage`, {
        headers: {
          Auth: authToken,
        },
      })
        .then((response) => response.json())
        .then((res) => setUserInfo(res))
        .then(() => console.log("userInfo", userInfo));
    };
    authToken && setToken(authToken);
    authToken && fetchProfile();
  }, [authToken]);

  useEffect(() => {
    token !== "" && console.log("left_container에서 확인한 recoilToken", token);
  }, [token]);

  useEffect(() => {
    const fetchImgSrc = async () => {
      console.log("프로필 이미지 받기 전 토큰 확인", token);
      fetch(`${process.env.REACT_APP_BASE_URL}/users/image`, {
        headers: {
          Auth: token,
        },
      })
        .then((response) => response.json())
        .then((res) => setImgSrc(res));
    };
    token && fetchImgSrc();
  }, [token]);

  useEffect(() => {
    const rightContainer = document.querySelector(
      ".right_container"
    ) as HTMLElement;
    if (rightContainer instanceof Element) {
      rightContainer.style.width = isOpen
        ? "calc(100vw - 500px)"
        : "calc(100%)";
    }
  }, [isOpen]);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const theme: themeProps = useTheme();

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

        <Profile
          imgSrc={imgSrc}
          name={userInfo.userName}
          age={userInfo.userAge}
        />

        <S.ListBox>
          <S.List theme={theme}>
            <S.HomeIconStyled
              theme={theme}
              onClick={() => {
                window.location.href = "/home";
              }}
            />
            <S.ListText
              onClick={() => {
                window.location.href = "/home";
              }}
            >
              홈
            </S.ListText>
          </S.List>
          <S.List theme={theme}>
            <S.PlayCircleOutlineIconStyled
              theme={theme}
              onClick={() => {
                setShowMatching(true);
              }}
            />{" "}
            <S.ListText
              onClick={() => {
                setShowMatching(true);
              }}
            >
              미팅 시작
            </S.ListText>
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
      {showMatching && (
        <Matching
          handleOnClick={() => console.log("logout")}
          setShowMatching={setShowMatching}
        />
      )}
    </>
  );
};

export default LeftContainer;
