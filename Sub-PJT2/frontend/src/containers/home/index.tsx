import * as S from "./Home.styled";
import { themeProps } from "@emotion/react";
import { userProps } from "types/types";
import { profileProps } from "types/types";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Slider from "components/slide";
import Tags from "components/tags";
import Intro from "components/intro";
import Postit from "components/postit";
import { useRecoilValue } from "recoil";
import { TokenValue } from "atoms/atoms";

const Home = () => {
  const theme: themeProps = useTheme();
  const [profileData, setProfileData] = useState<profileProps>();
  const [userData, setUserData] = useState<userProps>();
  const token = useRecoilValue(TokenValue);

  useEffect(() => {
		// console.log 찍는 코드 없애지 않고 둬서 디버깅 할 때 좋게합니다
		console.log("user api 실행 전 token 확인", token)
    const fetchImgSrc = async () => {
      fetch(`${process.env.REACT_APP_BASE_URL}/users/mypage`, {
        headers: {
          Auth: token,
        },
      })
        .then((response) => response.json())
        .then((res) => console.log(res));
    };

		// 토큰이 있을 때만 api fecth 함수 실행하도록 이렇게 코드 작성합니다
    token && fetchImgSrc();
  }, [token]);

    useEffect(() => {
		// console.log 찍는 코드 없애지 않고 둬서 디버깅 할 때 좋게합니다
		console.log("user api 실행 전 token 확인", token)
    const fetchImgSrc = async () => {
      fetch(`${process.env.REACT_APP_BASE_URL}/users/mypage`, {
        headers: {
          Auth: token,
        },
      })
        .then((response) => response.json())
        .then((res) => console.log(res));
    };

		// 토큰이 있을 때만 api fecth 함수 실행하도록 이렇게 코드 작성합니다
    token && fetchImgSrc();
  }, [token]);

  return (
    <S.Container>
      <S.ProfileContainer>
        {/* <S.ProfileImg
          src={profileData?.imgSrc}
          width={80}
          height={80}
          alt="profileImg"
        /> */}
        <S.LeftContainer>
          <p>{userData?.userAge}</p>
          <S.InnerContent>
            <S.miniTitle theme={theme}>{userData?.userName}</S.miniTitle>
            <S.Wall theme={theme}>|</S.Wall>
            <S.miniTitle theme={theme}>{userData?.userAge}</S.miniTitle>
            <S.Wall theme={theme}>|</S.Wall>
            <S.miniTitle theme={theme}>{profileData?.userJob}</S.miniTitle>
          </S.InnerContent>
          <S.InnerContent>
            <S.FavoriteIconStyled theme={theme} />
            <S.likeCount>좋아요 {userData?.userLike}개</S.likeCount>
          </S.InnerContent>
        </S.LeftContainer>
        <S.RightContainer>
          <S.InnerContent>
            <S.miniTitle theme={theme}>
              {profileData?.userSido} {profileData?.userGugun}
            </S.miniTitle>
          </S.InnerContent>
          <S.InnerContent>
            <S.miniTitle theme={theme}>{profileData?.userMbti}</S.miniTitle>
          </S.InnerContent>
        </S.RightContainer>
      </S.ProfileContainer>
      <S.OtherContainer>
        <S.Title theme={theme}>사진첩</S.Title>
        <Slider></Slider>
      </S.OtherContainer>
      <S.OtherContainer>
        <S.Title theme={theme}>취미</S.Title>
        <Tags hobby={profileData?.userHobby}></Tags>
      </S.OtherContainer>
      <S.OtherContainer>
        <S.Title theme={theme}>한 줄 소개</S.Title>
        <Intro data={profileData?.content}></Intro>
      </S.OtherContainer>
      <S