import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";

export const Container = styled.div<{ theme: themeProps }>`
  /* border: solid white; */
  background-color: ${(props) => props.theme.bg.light};
  transition: width, 500ms;
  width: 100%;
  /* height: 100%; */
  min-width: 40rem;
  margin: auto;
`;

export const ProfileImg = styled.div`
  background-color: red;
  border-radius: 5px;
  object-fit: cover;
  width: 360px;
  padding: 10px;
`;
