import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10001;
`;

export const CloseIconStyled = styled(CloseIcon)`
  margin-left: auto;
  z-index: 10001;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 1000px;
  height: 600px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const BtnContainer = styled.div`
  display: flex;
  margin: auto;
  margin-top: 120px;
  gap: 50px;
`;

export const Title = styled.div``;

export const FriendContainer = styled.div`
  height: 250px;
  overflow-y: auto;
  border-bottom: solid 1px white;
  margin-bottom: 20px;
  background-color: red;
  width: 300px;
`;

export const Container = styled.div`
  display: flex;
  margin: auto;
  margin-top: 120px;
  gap: 50px;
`;
