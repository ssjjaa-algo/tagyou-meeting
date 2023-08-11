import styled from "@emotion/styled";
import Button from "components/button";
import { keyframes, themeProps } from "@emotion/react";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: center;
  height: 100vh;
  column-gap: 30px;
`;

export const LogoBox = styled.div`
  width: 400px;
  height: 400px;
  background-color: #f43f5e;
  border-radius: 40px;
`;

export const TextBox = styled.div`
  display: inline-block;
`;

export const Btn = styled(Button)`
  margin-top: 20px;
`;

export const Nav = styled.div`
  border-radius: 40px;
  // background-color: green;
  position: relative;
`;

const upAni = keyframes`
  from {
    top: 30px;
  }
  to {
    top:20px;
  }
`;

export const Img = styled.img`
  display: inline-block;
  position: absolute;
  top: 20px;
  left: 980px;
  animation: ${upAni} 1s ease;
`;
