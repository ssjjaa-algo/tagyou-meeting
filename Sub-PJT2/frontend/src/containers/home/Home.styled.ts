import styled from "@emotion/styled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { themeProps } from "@emotion/react";
import { getThemeProps } from "@mui/system";

export const Container = styled.div`
  height: 100vh;
  /* width: 1200px; */
  width: calc(100% - 200px)
`;

export const ProfileImgBox = styled.div`
  display: block;
  overflow: hidden;
  height: 120px;
  width: 120px;
`;

export const ProfileImg = styled.img`
  border-radius: 100px;
  object-fit: cover;
  display: block;
  min-width: 10vw;
  min-height: 10vw;
  padding: 20px;
  margin-left: 10%;
`;

export const FavoriteIconStyled = styled(FavoriteIcon)<{
  theme: themeProps;
}>`
  color: #FF9993;
`;

export const Title = styled.text<{ theme: themeProps }>`
  color: ${(props) => props.theme.point.deep};
  font-size: 30px;
  font-weight: bold;
  display: inline-block;
`;

export const miniTitle = styled.div<{ theme: themeProps }>`
  color: ${(props) => props.theme.font.mid};
  width: 15vh;
  font-size: 17px;
  font-weight: bold;
  vertical-align: middle;
  text-align: center;
`;

export const likeCount = styled.div`
  color: #FF9993;
  font-size: 20px;
  font-weight: bold;
`