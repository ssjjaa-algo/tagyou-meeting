import { themeProps } from "@emotion/react";
import styled from "@emotion/styled";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import HomeIcon from "@mui/icons-material/Home";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import GroupIcon from "@mui/icons-material/Group";
import { Link } from "react-router-dom";
export const HomeIconStyled = styled(HomeIcon)<{
  theme: themeProps;
}>`
  color: ${(props) => props.theme.font.light};
  font-size: 25px;
`;

export const BtnBox = styled.div`
  width: fit-content;
  margin: 20px 10px 30px 10px;
`;

export const HiddenSection = styled.div<{ theme: themeProps }>`
  padding-top: 20px;
  width: 30px;
  background-color: ${(props) => props.theme.bg.deep};
  transition: all 500ms;
`;

export const List = styled.li<{ theme: themeProps }>`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 300;
  color: ${(props) => props.theme.font.light};
  line-height: 20px;
  cursor: pointer;
  border-bottom: solid 1px;
  padding: 18px 10px 18px 10px;
  border-bottom-color: ${(props) => props.theme.bg.mid};
  vertical-align: middle;
`;

export const PlayCircleOutlineIconStyled = styled(PlayCircleOutlineIcon)<{
  theme: themeProps;
}>`
  color: ${(props) => props.theme.font.light};
`;

export const GroupIconStyled = styled(GroupIcon)<{
  theme: themeProps;
}>`
  color: ${(props) => props.theme.font.light};
`;

export const ListBox = styled.ul`
  margin-top: 50px;
`;

export const ListText = styled.div`
  margin-left: 10px;
  font-weight: 400;
`;

export const LightModeIconStyled = styled(LightModeIcon)<{
  theme: themeProps;
}>`
  color: ${(props) => props.theme.font.light};
`;

export const DarkModeIconStyled = styled(DarkModeIcon)<{
  theme: themeProps;
}>`
  color: ${(props) => props.theme.font.light};
`;

export const ArrowForwardIosIconStyled = styled(ArrowForwardIosIcon)<{
  theme: themeProps;
}>`
  color: ${(props) => props.theme.font.light};
`;

export const ArrowBtn = styled.button`
  margin-left: 150px;
`;

export const ArrowBackIosIconStyled = styled(ArrowBackIosIcon)<{
  theme: themeProps;
}>`
  color: ${(props) => props.theme.font.light};
`;

export const FootBox = styled.div<{ theme: themeProps }>`
  color: ${(props) => props.theme.font.light};
  position: relative;
  left: 150px;
  top: 230px;
`;
