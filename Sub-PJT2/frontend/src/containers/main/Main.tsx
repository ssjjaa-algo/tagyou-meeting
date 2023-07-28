import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import { IsDark } from "../../atoms/atoms";
import { useRecoilValue } from "recoil";
import { darkTheme, lightTheme } from "../../styles/ColorSystem";
import GlobalStyle from "../../styles/GlobalStyle";
import LeftContainer from "../leftContainer";
import RightContainer from "../rightContainer";
import TestImg from "../../asset/img/imgSrcTest.jpg";
import Router from "../../Router";
import { leftContainerProprs } from "types/types";
import { BrowserRouter } from "react-router-dom";
function Main() {
  const isDark = useRecoilValue(IsDark);

  const leftContainerData: leftContainerProprs = {
    imgSrc: TestImg,
    name: "스티븐",
    age: 32,
  };

  return (
    <div>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <Global styles={GlobalStyle} />
        <BrowserRouter>
          <Container>
            <LeftContainer
              imgSrc={leftContainerData.imgSrc}
              name={leftContainerData.name}
              age={leftContainerData.age}
            />
            <RightContainer>
              <Router />
            </RightContainer>
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

const Container = styled.div`
  display: flex;
`;

export default Main;
