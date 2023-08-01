import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";
import backgroundImg from "asset/img/main-bgrndimg.png";

export const Container = styled.div`
  border: solid black;
  width: 100vw;
  height: 100vh;
  min-width: fit-content;
  min-height: fit-content;
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  background-attachment: fixed;
`;

export const LandingBody = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const LandingTitle = styled.div`
  /* border: solid green; */
  width: fit-content;
  height: fit-content;
  color: white;
  width: 40rem;
  font-weight: 900;
  font-size: 4rem;
  margin-right: 25rem;
`;

export const LoginBox = styled.div<{ theme: themeProps }>`
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${(props) => props.theme.point.light};
  border-radius: 0.3rem;
  width: 25%;
  height: 40%;
`;

export const StartBoxTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-weight: 900;
  font-size: 2rem;
  opacity: 0.7;
`;

export const KaKaoLoginBtn = styled.button`
  /* border: solid green; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 0.3rem;
  width: 85%;
  height: 2.5rem;
  background-color: #ffeb02;
  font-weight: 600;
`;

export const kakaologo = styled.img`
  height: 2rem !important;
  width: 2rem !important;
`;

export const StartSectionText = styled.div`
  /* border: solid yellow; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 27rem;
  opacity: 0.7;
  font-size: small;
  font-weight: 500;
`;

export const GoLoginText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: small;
  margin-top: 0.3rem;
`;

export const GoRegisterBtn = styled.button`
  border: none;
  font-size: 1rem;
  font-weight: 700;
`;
