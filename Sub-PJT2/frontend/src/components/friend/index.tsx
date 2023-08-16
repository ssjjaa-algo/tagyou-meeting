import { friendProps } from "types/types";
import * as S from "./Friend.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";

type friendCompoentProps = friendProps & {
  handleAccecpt?: (targetId: number) => void;
  handleReject?: (targetId: number) => void;
};

const Friend = ({
  friendShipStatus,
  targetId,
  targetName,
  targetImageUrl,
  handleAccecpt,
  handleReject,
}: friendCompoentProps) => {
  const theme: themeProps = useTheme();
  return (
    <>
      <S.Profile to={`/chatroom/${targetId}`}>
        <S.ProfileImgBox>
          <S.ProfileImg
            src={targetImageUrl}
            width={30}
            height={30}
            alt="profile"
          />
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
            onClick={() => {
              handleAccecpt && handleAccecpt(targetId);
            }}
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
            onClick={() => {
              handleReject && handleReject(targetId);
            }}
          >
            거절
          </S.StyledBtn>
        )}
      </S.BtnContainer>
    </>
  );
};

export default Friend;
