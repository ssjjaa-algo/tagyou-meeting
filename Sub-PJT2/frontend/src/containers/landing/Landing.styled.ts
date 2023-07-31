import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";
import backgroundImg from "asset/img/main-bgrndimg.png";

export const Container = styled.div`
  /* border: solid black; */
  width: 100%;
  height: 100%;
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

export const LandingTitle1 = styled.div``;

export const LandingTitle2 = styled.div`
  margin-left: 4rem;
`;

export const StartSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StartBtn = styled.button<{ theme: themeProps }>`
  /* border: solid green; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 0.3rem;
  width: 10rem;
  height: 3.5rem;
  background-color: ${(props) => props.theme.point.light};
  font-size: large;
`;

export const StartSectionText = styled.div`
  /* border: solid yellow; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 27rem;
  color: white;
  margin-top: 0.5rem;
`;

export const GoLoginBtn = styled.button`
  border: none;
  font-size: 1.2rem;
  color: blue;
`;
