import styled from "@emotion/styled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { themeProps } from "@emotion/react";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: red;
  vertical-align: center;
`;

export const ProfileContainer = styled.div`
  width: 80%;
  display: flex;
  background-color: blue;
  border-radius: 5px;
  margin: auto;
  overflow: hidden;
`;

export const Img = styled.img`
  width: 50%;
`;

export const SContainer = styled.div`
  display: flex;
  /* margin-right: 150px; */
  max-width: 40vw;
  padding-bottom: 50px;
  align-items: center;
  background-color: yellow;
`;

export const OtherContainer = styled.div`
  padding-bottom: 50px;
  align-items: center;
`;

export const InnerContent = styled.div`
  display: flex;
  align-items: center;
`;

export const Contents = styled.div`
  margin: 30px 30px 30px 10px;
  background-color: silver;
`;

export const LeftContainer = styled.div`
  width: inherit;
  background-color: brown;
`;
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
  color: #ff9993;
`;

export const Title = styled.text<{ theme: themeProps }>`
  color: ${(props) => props.theme.point.deep};
  font-size: 25px;
  font-weight: bold;
  /* display: block; */
`;

export const miniTitle = styled.text<{ theme: themeProps }>`
  color: ${(props) => props.theme.font.deep};
  font-size: 24px;
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
  color: #ff9993;
  font-size: 17px;
  font-weight: bold;
`;
