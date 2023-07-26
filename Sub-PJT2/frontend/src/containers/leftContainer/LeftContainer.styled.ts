import { themeProps } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.div`
  background-color: red;
`;

export const ProfileImg = styled.div`
  background-color: red;
  border-radius: 5px;
  object-fit: cover;
  width: 180px;
`;

export const ImageBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

export const Btn = styled.button<{ theme: themeProps }>`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.fontColor};
  width: 100px;
  height: 100px;
`;
