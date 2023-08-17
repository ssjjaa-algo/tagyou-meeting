import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";
import { Button } from "antd";

export const Profile = styled.div`
  display: flex;
  vertical-align: middle;
`;

export const ProfileImgBox = styled.div`
  display: block;
  overflow: hidden;
  height: 60px;
  width: 60px;
  position: relative;
`;

export const UserStatus = styled.div`
  position: absolute;
  box-shadow: 1px 1px 3px 1px #dadce0 inset;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  margin: 0.3rem 0 0 0.2rem;
`;

export const ProfileText = styled.div`
  margin: auto 0 auto 0;
  padding-left: 5px;
`;

export const ProfileImg = styled.img`
  border-radius: 20px;
  object-fit: cover;
  display: block;
  min-width: 100%;
  min-height: 100%;
  padding: 10px;
`;

export const Name = styled.div<{ theme: themeProps }>`
  color: ${(props) => props.theme.font.light};
  font-size: 14px;
  font-weight: 600;
`;

export const StyledBtn = styled(Button)<{
  source: "accept" | "reject";
  theme: themeProps;
}>`
  background-color: ${(props) =>
    props.source === "accept" ? "##5d85be" : "#da3350"} !important;
  font-size: 4px !important;
  font-weight: 600;
  width: 35px;
  margin-right: 5px;
`;

export const Intro = styled(Name)`
  font-size: 8px;
  font-weight: normal;
  margin-top: 5px;
`;

export const BtnContainer = styled.div`
  margin-left: 120px;
`;
