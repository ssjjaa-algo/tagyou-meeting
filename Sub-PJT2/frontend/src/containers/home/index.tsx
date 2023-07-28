import * as S from "./Home.styled";
import { getProfileProps } from "types/types";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const Home = () => {
  const theme: themeProps = useTheme();

  const [ profileData, setProfileData ] = useState<getProfileProps>();
  useEffect(()=>{
    const fetchData = async () => {
      fetch("profile")
      .then((res) => res.json())
      .then((data) => {
        setProfileData(data);

        console.log(data)
      });
    }
    fetchData();
  },[])

  return (
    <S.Container>
      <div>ddddddd</div>
      {profileData?.age}
      <S.ProfileImg src={profileData?.imgSrc} width={80} height={80} alt="profileImg" />
      <S.miniTitle theme={theme}>{profileData?.name}</S.miniTitle>
      <S.miniTitle theme={theme}>{profileData?.age}</S.miniTitle>
      <S.miniTitle theme={theme}>{profileData?.job}</S.miniTitle>
      <S.miniTitle theme={theme}>{profileData?.region_sido}</S.miniTitle>
      <S.miniTitle theme={theme}>{profileData?.region_sigungu}</S.miniTitle>
      <S.miniTitle theme={theme}>{profileData?.mbti}</S.miniTitle>
      <S.miniTitle theme={theme}>{profileData?.hobby}</S.miniTitle>
      <S.FavoriteIconStyled theme={theme} />
      <S.likeCount>좋아요 {profileData?.like}개</S.likeCount>
      
      <S.Title theme={theme}>취미</S.Title>
      <S.Title theme={theme}>한 줄 소개</S.Title>
      <S.Title theme={theme}>방명록</S.Title>
      

    </S.Container>
  );
};

export default Home;
