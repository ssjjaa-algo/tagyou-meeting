import { friendProps } from "types/types";
import * as S from "./Friend.styled";
import tmpImgSrc from "../../asset/img/imgSrcTest.jpg";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { Button } from "antd";
const Friend = ({
  friendShipStatus,
  targetId,
  targetName,
  targetImg,
}: friendProps) => {
  const theme: themeProps = useTheme();
  return (
    <>
      <S.Profile to={`/chatroom/${targetId}`}>
        <S.ProfileImgBox>
          <S.ProfileImg src={tmpImgSrc} width={30} height={30} alt="profile" />
        </S.ProfileImgBox>
        <S.ProfileText>
          <S.Name theme={theme}>{targetName}</S.Name>
          <S.Intro theme={theme}>고정했어요</S.Intro>
        </S.ProfileText>
      </S.Profile>
      <S.BtnContainer>
        {friendShipStatus === "RECEIVED" && (
          <S.StyledBtn
            type="primary"
            size="small"
            source="accept"
            theme={theme}
          >
            수락
          </S.StyledBtn>
        )}
        {friendShipStatus === "RECEIVED" && (
          <S.StyledBtn
            type="primary"
            size="small"
            source="reject"
            theme={theme}
          >
            거절
          </S.StyledBtn>
        )}
      </S.BtnContainer>
    </>
  );
};

export default Friend;
