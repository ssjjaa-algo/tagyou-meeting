import * as S from "./Home.styled";
// import { getProfileProps } from "types/types";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
// import Slider from "components/slide";
// import Tags from "components/tags";
// import Intro from "components/intro";

const Home = () => {
  const theme: themeProps = useTheme();

  // const [profileData, setProfileData] = useState<getProfileProps>();

  useEffect(() => {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE2OTEwNDEyMjMsImV4cCI6MTY5MTA0MTgyM30.AJkaPG4ybig-ig59PoGyrMsQaQAWBLVFEffNufliG0k";
    const fetchData = async () => {
      fetch("api/users/profile", {
        headers: {
          'Auth': token
        }
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          console.log('here')
        });
    };
    fetchData();
  }, []);

  
  return (
    <>
    <div>
      연습용 페이지
    </div>
    </>
  )
  //   <S.Container>
  //     <S.ProfileContainer>
  //       <S.ProfileImg
  //         src={profileData?.imgSrc}
  //         width={80}
  //         height={80}
  //         alt="profileImg"
  //       />
  //       <S.LeftContainer>
  //         <S.InnerContent>
  //           <S.miniTitle theme={theme}>{profileData?.name}</S.miniTitle>
  //           <S.Wall theme={theme}>|</S.Wall>
  //           <S.miniTitle theme={theme}>{profileData?.age}</S.miniTitle>
  //           <S.Wall theme={theme}>|</S.Wall>
  //           <S.miniTitle theme={theme}>{profileData?.job}</S.miniTitle>
  //         </S.InnerContent>
  //         <S.InnerContent>
  //           <S.FavoriteIconStyled theme={theme} />
  //           <S.likeCount>좋아요 {profileData?.like}개</S.likeCount>
  //         </S.InnerContent>
  //       </S.LeftContainer>
  //       <S.RightContainer>
  //         <S.InnerContent>
  //           <S.miniTitle theme={theme}>
  //             {profileData?.region_sido} {profileData?.region_sigungu}
  //           </S.miniTitle>
  //         </S.InnerContent>
  //         <S.InnerContent>
  //           <S.miniTitle theme={theme}>{profileData?.mbti}</S.miniTitle>
  //         </S.InnerContent>
  //       </S.RightContainer>
  //     </S.ProfileContainer>
  //     <S.OtherContainer>
  //       <S.Title theme={theme}>사진첩</S.Title>
  //       <Slider></Slider>
  //     </S.OtherContainer>
  //     <S.OtherContainer>
  //       <S.Title theme={theme}>취미</S.Title>
  //       <Tags></Tags>
  //       {/* <Tags hobby={profileData?.hobby}></Tags> */}
  //     </S.OtherContainer>
  //     <S.OtherContainer>
  //       <S.Title theme={theme}>한 줄 소개</S.Title>
  //       <Intro></Intro>
  //     </S.OtherContainer>
  //     <S.OtherContainer>
  //       <S.Title theme={theme}>방명록</S.Title>
  //     </S.OtherContainer>
  //   </S.Container>
  // );
};

export default Home;
