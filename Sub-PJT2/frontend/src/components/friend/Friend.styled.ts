import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";
import { Link } from "react-router-dom";

export const Container = styled(Link)`
  display: flex;
  align-content: center;
`;

export const ProfileImgBox = styled.div`
  display: block;
  overflow: hidden;
  height: 80px;
  width: 80px;
`;

export const ProfileImg = styled.img`
  border-radius: 20px;
  object-fit: cover;
  display: block;
  min-width: 100%;
  min-height: 100%;
  padding: 15px;
`;
