import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import { IsDark } from "../../atoms/atoms";
import { useRecoilValue } from "recoil";
import { darkTheme, lightTheme } from "../../styles/ColorSystem";
import GlobalStyle from "../../styles/GlobalStyle";
import LeftContainer from "../leftContainer";
import RightContinaer from "../rightContainer";

function Main() {
  const isDark = useRecoilValue(IsDark);
  return (
    <div>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <Global styles={GlobalStyle} />
        <Container>
          <LeftContainer />
          <RightContinaer />
        </Container>
      </ThemeProvider>
    </div>
  );
}
const Container = styled.div`
  display: flex;
`;

export default Main;
