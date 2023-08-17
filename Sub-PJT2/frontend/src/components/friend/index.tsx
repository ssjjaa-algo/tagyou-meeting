import * as S from "./Friend.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";

type friendCompoentProps = {
  friendShipStatus: "REQUESTED" | "BLOCKED" | "FRIEND" | "NONE" | "RECEIVED";
  targetId: number;
  targetName: string;
  targetImageUrl: string;
  targetGender: "MALE" | "FEMALE";
  targetAge: number;
  handleAccecpt?: (targetId: number) => void;
  handleReject?: (targetId: number) => void;
};

const Friend = ({
  friendShipStatus,
  targetId,
  targetName,
  targetImageUrl,
  targetAge,
  targetGender,
  handleAccecpt,
  handleReject,
}: friendCompoentProps) => {
  const theme: themeProps = useTheme();

  // loadUserStatus(item.targetId)
  // const loadUserStatus = (id: number) => {
  //   fetch(`${process.env.REACT_APP_BASE_URL}/users/getUserStatus/${userInfo.}`, {
  //     headers: {
  //       Auth: token,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => console.log("RRRR", res));
  // };

  return (
    <>
      <S.Profile>
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
