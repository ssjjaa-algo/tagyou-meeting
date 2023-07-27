import { themeProps } from "@emotion/react";
import styled from "@emotion/styled";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import HomeIcon from "@mui/icons-material/Home";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import GroupIcon from "@mui/icons-material/Group";

export const HomeIconStyled = styled(HomeIcon)<{
  theme: themeProps;
}>`
  color: ${(props) => props.theme.pointDeepColor};
  font-size: 25px;
`;

export const List = styled.li<{ theme: themeProps }>`
  font-size: 20px;
  font-weight: 400;
  color: ${(props) => props.theme.fontColor};
  margin: 0 20px 0 20px;
  line-height: 20px;
  cursor: pointer;
  border-bottom: solid;
  padding: 20px 0 20px 0;
  border-bottom-color: ${(props) => props.theme.fontColor};
`;

export const PlayCircleOutlineIconStyled = styled(PlayCircleOutlineIcon)<{
  theme: themeProps;
}>`
  color: ${(props) => props.theme.fontColor};
`;

export const GroupIconStyled = styled(GroupIcon)<{
  theme: themeProps;
}>`
  color: ${(props) => props.theme.fontColor};
`;

export const Profile = styled.div`
  display: flex;
  justify-content: center;
  vertical-align: middle;
`;

export const ListBox = styled.ul`
  margin-top: 100px;
`;

export const LightModeIconStyled = styled(LightModeIcon)<{
  theme: themeProps;
}>`
  color: ${(props) => props.theme.pointLightColor};
`;

export const DarkModeIconStyled = styled(DarkModeIcon)<{
  theme: themeProps;
}>`
  color: ${(props) => props.theme.pointLightColor};
`;

export const ArrowForwardIosIconStyled = styled(ArrowForwardIosIcon)<{
  theme: themeProps;
}>`
  color: ${(props) => props.theme.pointLightColor};
`;

export const ArrowBtn = styled.button`
  margin-left: 150px;
`;

export const ArrowBackIosIconStyled = styled(ArrowBackIosIcon)<{
  theme: themeProps;
}>`
  color: ${(props) => props.theme.pointLightColor};
`;

export const ProfileImgBox = styled.div`
  display: flex;
`;
export const BtnBox = styled.div`
  width: fit-content;
  margin: 20px 10px 30px 10px;
`;

export const ProfileText = styled.div`
  margin-top: 15%;
`;

export const ProfileImg = styled.img`
  border-radius: 100px;
  object-fit: cover;
  padding: 4px;
  margin-right: 8px;
`;

export const Name = styled.div<{ theme: themeProps }>`
  color: ${(props) => props.theme.fontColor};
  font-size: 18px;
  font-weight: bold;
`;

export const Age = styled(Name)`
  font-size: 14px;
  font-weight: normal;
  margin-top: 10px;
`;

export const FootBox = styled.div<{ theme: themeProps }>`
  color: ${(props) => props.theme.pointLightColor};
  margin-top: 280px;
  margin-left: 160px;
`;
