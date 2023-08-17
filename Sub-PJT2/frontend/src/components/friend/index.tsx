import * as S from "./Friend.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { TokenValue } from "atoms/atoms";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

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

  const token = useRecoilValue(TokenValue);

  const [userStatus, setUserStatus] = useState("OFFLINE");
  const [userStatusStyle, setUserStatusStyle] = useState({
    backgroundColor: "blue",
  });

  const loadUserStatus = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/users/state/${targetId}`, {
      headers: {
        Auth: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserStatus(data.userStatus);
      });
  };

  useEffect(() => {
    console.log("왜 안돼!");
    loadUserStatus();
  }, [token]);

  const handleUserStausChange = () => {
    console.log("유저의 접속상태: " + userStatus);
    switch (userStatus) {
      case "ONLINE":
        setUserStatusStyle({ backgroundColor: "#1AF354" });
        break;
      case "OFFLINE":
        setUserStatusStyle({ backgroundColor: "grey" });
        break;
      case "INGAME":
        setUserStatusStyle({ backgroundColor: "#FF1493" });
        break;
    }
  };
  useEffect(() => {
    handleUserStausChange();
  }, [userStatus]);

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
        <S.UserStatus style={userStatusStyle} />
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
