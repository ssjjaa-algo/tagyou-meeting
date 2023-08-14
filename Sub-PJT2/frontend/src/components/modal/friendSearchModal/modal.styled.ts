import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import { Input } from "antd";

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
  z-index: 9999;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 400px;
  height: 300px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const StyledInput = styled(Input)`
  width: 280px;
  position: absolute;
  top: 150px;
  left: 60px;
`;

export const CloseIconStyled = styled(CloseIcon)`
  margin-left: auto;
`;

const Ani = keyframes`
  from {
    top: 50px;
  }
  to {
    top: 15px;
  }
`;

export const LogoImg = styled.img`
  width: 200px;
  margin: 60px auto 0 auto;
  position: absolute;
  top: 15px;
  left: 100px;
  animation: ${Ani} 1s ease;
`;

export const RequestBtn = styled.button`
  width: 280px;
  height: 40px;
  background-color: #f2f2f2;
  position: absolute;
  border-radius: 10px;
  top: 200px;
  left: 60px;
  & {
    :hover {
      background-color: silver;
    }
  }
`;
