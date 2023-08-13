import { friendProps } from "types/types";
import * as S from "./Friend.styled";
import tmpImgSrc from "../../asset/img/imgSrcTest.jpg";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";

const Friend = ({
  friendShipStatus,
  targetId,
  targetName,
  targetImg,
}: friendProps) => {
  const theme: themeProps = useTheme();
  return (
    <S.Profile to={`/chatroom/${targetId}`}>
      <S.ProfileImgBox>
        <S.ProfileImg src={tmpImgSrc} width={50} height={50} alt="profile" />
      </S.ProfileImgBox>
      <S.ProfileText>
        <S.Name theme={theme}>{targetName}</S.Name>
      </S.ProfileText>
    </S.Profile>
  );
};

export default Friend;
