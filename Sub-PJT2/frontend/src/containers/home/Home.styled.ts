import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";

export const Container = styled.div`
  height: 100vh;
  width: 1200px;
`;
export const DeepText = styled.div<{ theme: themeProps }>`
  color: ${(props) => props.theme.font.deep};
  font-size: 30px;
  font-weight: bold;
  margin-left: 500px;
`;

export const MidText = styled(DeepText)<{ theme: themeProps }>`
  color: ${(props) => props.theme.font.mid};
`;

export const LightText = styled(DeepText)<{ theme: themeProps }>`
  color: ${(props) => props.theme.font.light};
  background-color: ${(props) => props.theme.bg.deep};
`;

export const ProfileImg = styled.div`
  background-color: red;
  border-radius: 5px;
  object-fit: cover;
  width: 360px;
`;
