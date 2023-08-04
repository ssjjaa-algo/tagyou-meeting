import * as S from "./Home.styled";
import { themeProps } from "@emotion/react";
import { UserData } from "types/types"
import { ProfileData } from "types/types"
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Slider from "components/slide";
import Tags from "components/tags";
import Intro from "components/intro";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const theme: themeProps = useTheme  ();
  const [userData, setUserData] = useState<UserData>();
  const [profileData, setProfileData] = useState<ProfileData>();
  // const [searchParams] = useSearchParams();


  useEffect(() => {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3Iiwicm9sZSI6IlVTRVIiLCJpYXQiOjE2OTExMTQwOTEsImV4cCI6MTY5MTExNDY5MX0.rHiZCF4PLt1dT9gvSGH466zFj0HXGkVz2WSkkXdvxyA"
    // fetch("api/users/tmp/token", {
    //   headers: {
    //     'Auth': 'master',
    //     'userId': '7'
    //   }})
    //   .then((res) => 
    //     console.log(res)
    //   ) 
      
      // JSON 변환
      // .then((data) => {
      //   console.log('결과물:', data);
      // })
    const fetchData = async () => {
      fetch("api/users/profile", {
        headers: {
          'Auth': token
        }
      })
        .then(async (res) => 
        {const data = await res.json()
        if (data !== undefined) {setUserData(data)}
        })
      fetch("api/users/mypage", {
        headers: {
          'Auth': token
        }
      })
        .then(async (res) => 
        {const data = await res.json()
        if (data !== undefined) {setProfileData(data)}
        })
      };
    fetchData();
  }, []);

  
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
        <Intro content={profileData?.content}></Intro>
      </S.OtherContainer>
      <S.OtherContainer>
        <S.Title theme={theme}>방명록</S.Title>
      </S.OtherContainer>
    </S.Container>
  );
};

export default Home;
