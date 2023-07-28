import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";
import { Link } from "react-router-dom";

export const Profile = styled(Link)`
  display: flex;
  vertical-align: middle;
  margin-top: 5px;
`;

export const ProfileImgBox = styled.div`
  display: block;
  overflow: hidden;
  height: 80px;
  width: 80px;
`;

export const ProfileText = styled.div`
  margin: auto 0 auto 0;
`;

export const ProfileImg = styled.img`
  border-radius: 20px;
  object-fit: cover;
  display: block;
  min-width: 100%;
  min-height: 100%;
  padding: 15px;
`;

export const Name = styled.div<{ theme: themeProps }>`
  color: ${(props) => props.theme.font.light};
  font-size: 16px;
  font-weight: bold;
`;

export const Age = styled(Name)`
  font-size: 14px;
  font-weight: normal;
  margin-top: 10px;
`;
