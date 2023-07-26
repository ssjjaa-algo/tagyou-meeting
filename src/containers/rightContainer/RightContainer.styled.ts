import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";

export const Container = styled.div<{ theme: themeProps }>`
  background-color: ${(props) => props.theme.pointLightColor};
  height: 100vh;
  width: 100vw;
`;

export const ProfileImg = styled.div`
  background-color: red;
  border-radius: 5px;
  object-fit: cover;
  width: 360px;
  padding: 10px;
`;
