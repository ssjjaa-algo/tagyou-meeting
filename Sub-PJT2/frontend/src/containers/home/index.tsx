import * as S from "./Home.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import Slider from "components/slide";
import Tags from "components/tags";
import Intro from "components/intro";
import Postit from "components/postit";
import { useRecoilValue } from "recoil";
import { ProfileImgSrc, UserInfo, ProfileInfo } from "atoms/atoms";

const Home = () => {
  const theme: themeProps = useTheme();
  const profileSrc = useRecoilValue(ProfileImgSrc);
  const userInfo = useRecoilValue(UserInfo);
  const profileInfo = useRecoilValue(ProfileInfo);

  return (
    <S.Container>
      <S.ProfileContainer>
        <S.Img src={profileSrc} width={100} alt="profileimg" />
        <S.LeftContainer>
          <S.Contents>
            <S.InnerContent>
              <S.miniTitle theme={theme}>{userInfo.userName}</S.miniTitle>
              <S.Wall theme={theme}>|</S.Wall>
              <S.miniTitle theme={theme}>{userInfo.userAge}세</S.miniTitle>
              <S.Wall theme={theme}>|</S.Wall>
              <S.miniTitle theme={theme}>
                {userInfo.userGender === "FEMALE" ? "👧" : "👦"}
              </S.miniTitle>
              <S.miniTitle theme={theme}>{profileInfo.userJob}</S.miniTitle>
            </S.InnerContent>
            <S.InnerContent>
              <div># 좋아하는_것_ 과자</div>
            </S.InnerContent>
          </S.Contents>

          {/* <S.InnerContent>
            <S.FavoriteIconStyled theme={theme} />
            <S.likeCount>좋아요 {userInfo.userLike}개</S.likeCount>
          </S.InnerContent> */}
        </S.LeftContainer>
        {/* <S.RightContainer>
          <S.InnerContent>
            <S.miniTitle theme={theme}>
              {profileInfo.userSido} {profileInfo.userGugun}
            </S.miniTitle>
          </S.InnerContent>
          <S.InnerContent>
            <S.miniTitle theme={theme}>{profileInfo.userMbti}</S.miniTitle>
          </S.InnerContent>
        </S.RightContainer> */}
        {/* <S.OtherContainer>
          <S.Title theme={theme}>사진첩</S.Title>
          <Slider></Slider>
        </S.OtherContainer>
        <S.OtherContainer>
          <S.Title theme={theme}>취미</S.Title>
          <Tags></Tags>
        </S.OtherContainer>
        <S.OtherContainer>
          <S.Title theme={theme}>한 줄 소개</S.Title>
          <Intro data={profileInfo.content}></Intro>
        </S.OtherContainer> */}
      </S.ProfileContainer>
    </S.Container>
  );
};

export default Home;
