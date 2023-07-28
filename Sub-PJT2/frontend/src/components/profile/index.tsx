import * as S from "./Profile.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { leftContainerProprs } from "types/types";

const Profile = ({ imgSrc, name, age }: leftContainerProprs) => {
  const theme: themeProps = useTheme();
  return (
    <S.Profile>
      <S.ProfileImgBox>
        <S.ProfileImg src={imgSrc} width={80} height={80} alt="profileImg" />
      </S.ProfileImgBox>
      <S.ProfileText>
        <S.Name theme={theme}>{name}</S.Name>
        <S.Age theme={theme}>
          만 <strong>{age}</strong>세
        </S.Age>
      </S.ProfileText>
    </S.Profile>
  );
};

export default Profile;
