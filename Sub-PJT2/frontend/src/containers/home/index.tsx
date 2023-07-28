import * as S from "./Home.styled";
import TestImg from "../../asset/img/imgSrcTest.jpg";
import Main from '../main/Main'

const Home = () => {
  // const theme: themeProps = useTheme();
  return (
    <S.Container>
      <S.ProfileImgBox>
        {/* <S.ProfileImg src={imgSrc} width={80} height={80} alt="profileImg" /> */}
        <Main></Main>
      </S.ProfileImgBox>
    </S.Container>
  );
};

export default Home;
