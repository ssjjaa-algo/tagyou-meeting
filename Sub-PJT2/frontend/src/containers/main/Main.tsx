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

  const showSideBar = () => {
    const position = document.location.pathname;
    if (
      position === "/chatList" ||
      position.search("/chatRoom") === 1 ||
      position === "/mypage" ||
      position === "/home"
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Global styles={GlobalStyle} />
      <BrowserRouter>
        <Container theme={isDark}>
          {/* {Router.caller.name} */}
          {showSideBar() ? (
            <LeftContainer
              imgSrc={leftContainerData.imgSrc}
              name={leftContainerData.name}
              age={leftContainerData.age}
            />
          ) : null}
          <RightContainer>
            <Router />
          </RightContainer>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const Container = styled.div<{ theme: boolean }>`
  display: flex;
  background-color: ${(props) =>
    props.theme ? darkTheme.bg.light : lightTheme.bg.light};
  /* border: dotted red 2px; */
  width: 100% !important;
  height: 100% !important;
  min-height: fit-content;
  min-width: fit-content;
`;

export default Main;
