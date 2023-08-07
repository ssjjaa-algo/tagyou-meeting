import styled from "@emotion/styled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { themeProps } from "@emotion/react";
import { getThemeProps } from "@mui/system";

export const Container = styled.div`
  margin-top: 10vh;
  margin-left: 10%;
  justify-items: center;
  /* width: 1200px; */
  width: calc(100% - 200px)
`;

export const ProfileContainer = styled.div`
  display: flex;
  /* margin-right: 150px; */
  max-width: 40vw;
  padding-bottom: 50px;
  align-items: center;
`

export const OtherContainer = styled.div`
  padding-bottom: 50px;
  align-items: center;
`

export const InnerContent = styled.div`
  display: flex;
  align-items: center;
`

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
`
export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-top: 13px;
`;


export const ProfileImg = styled.img`
  border-radius: 100px;
  object-fit: cover;
  display: block;
  min-width: 200px;
  min-height: 200px;
  padding: 20px;
`;

export const FavoriteIconStyled = styled(FavoriteIcon)<{
  theme: themeProps;
}>`
  color: #FF9993;
`;

export const Title = styled.text<{ theme: themeProps }>`
  color: ${(props) => props.theme.point.deep};
  font-size: 25px;
  font-weight: bold;
  /* display: block; */
`;

export const miniTitle = styled.text<{ theme: themeProps }>`
  color: ${(props) => props.theme.font.mid};
  font-size: 17px;
  font-weight: bold;
  text-align: center;
  padding-bottom: 15px;
`;

export const Wall = styled.div<{ theme: themeProps }>`
  color: ${(props) => props.theme.font.mid};
  width: 2.5em; 
  font-size: 17px;
  font-weight: bold;
  text-align: center;
  padding-bottom: 15px;
`;

export const likeCount = styled.div`
  color: #FF9993;
  font-size: 17px;
  font-weight: bold;
`