import * as S from "./Header.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { GameStart as GameStartAtom, RoomInfo } from "atoms/atoms";
import { useRecoilState } from "recoil";
import exitImg from "asset/img/icons8-exit-50.png";
import homeImg from "asset/img/home.png";
import tmpLogo from "asset/img/logo/2.png";
// import { roomProps } from "types/types";


const Header = () => {
  const [roomInfo, setRoomInfo] = useRecoilState(RoomInfo); // 추가
  const theme: themeProps = useTheme();
  const [GameStart, setGameStart] = useRecoilState(GameStartAtom);

  const GotoMeeting = () => {
    window.location.href = `/meeting/${roomInfo.roomId}`;
  };

  const removeRoomInfoFromLocalStorage = () => {
    localStorage.removeItem('RoomInfo'); // 'roomInfo'는 로컬 스토리지에 저장된 키 이름입니다
};

  const GotoHome = () => {
    alert("방 나가기 완료")
    window.location.href = "/home";
    removeRoomInfoFromLocalStorage()
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

