import * as S from "./RightContainer.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { TokenValue } from "atoms/atoms";
import { ReactNode, useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useRecoilState } from "recoil";

type RightContinaerProp = {
  children?: JSX.Element | JSX.Element[] | ReactNode;
};

const RightContainer = ({ children }: RightContinaerProp) => {
  const theme: themeProps = useTheme();

  const cookies = new Cookies();
  const [token, setToken] = useRecoilState(TokenValue);
  const [location, setLocation] = useState<string>("");
  useEffect(() => {
    const T = cookies.get("Auth");
    setToken(T);
  }, [cookies.get("Auth")]);

  useEffect(() => {
    setLocation(window.location.pathname);
  }, [token]);

  // pathname이 바뀔 경우 pathname이 meeting이 아니면 userStatus를 null로 바꿔야 함
  useEffect(() => {
    console.log(token);
    console.log("위치: " + location);
    if (location.search("meeting") != 1 && location !== "" && location !== "/") {
      fetch(`${process.env.REACT_APP_BASE_URL}/users/setUserStatus`, {
        headers: {
          Auth: token,
        },
      });
    }
  }, [location]);
  return (
    <>
      <S.Container className="right_container" theme={theme}>
        {children}
      </S.Container>
    </>
  );
};

export default RightContainer;
