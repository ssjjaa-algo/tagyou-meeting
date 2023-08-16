import * as S from "./Header.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { GameStart as GameStartAtom } from "atoms/atoms";
import { useRecoilState } from "recoil";
import exitImg from "asset/img/icons8-exit-50.png";
import homeImg from "asset/img/home.png";
import tmpLogo from "asset/img/logo/2.png";
// import { roomProps } from "types/types";


const Header = () => {
  // const storedRoomInfo = localStorage.getItem('roomInfo');
  // if (storedRoomInfo) {
  //   const parsedRoomInfo = JSON.parse(storedRoomInfo);
  //   setRoomInfo(parsedRoomInfo);
  // }

  const theme: themeProps = useTheme();
  const [GameStart, setGameStart] = useRecoilState(GameStartAtom);

  const GotoMeeting = () => {
    window.location.href = `/meeting/`;
  };

  const GotoHome = () => {
    window.location.href = "/home";
  };

  return (
    <S.Header theme={theme}>
      <S.Exit
        src={GameStart ? exitImg : homeImg}
        alt="exit"
        onClick={GameStart ? GotoMeeting : GotoHome}
      />
      <S.Logo src={tmpLogo} alt="logo" />
    </S.Header>
  );
};

export default Header;
function setRoomInfo(parsedRoomInfo: any) {
  throw new Error("Function not implemented.");
}

