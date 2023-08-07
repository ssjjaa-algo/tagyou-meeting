import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

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
  width: 500px;
  height: 600px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Ani = keyframes`
  from {
    top: 40px;
  }
  to {
    top: 20px;
  }
`;

const Ani2 = keyframes`
  from {
    top: 510px;
  }
  to {
    top: 500px;
  }
`;

export const LogoImg = styled.img`
  width: 200px;
  margin: 60px auto 0 auto;
  position: absolute;
  top: 20px;
  left: 150px;
  animation: ${Ani} 1s ease;
`;

export const UserBox = styled.form`
  position: absolute;
  top: 170px;
  left: 150px;
`;

export const Input = styled.input`
  display: block;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #f43f5e;
`;

export const ProfileBox = styled(UserBox)`
  top: 290px;
`;

export const Button = styled.button`
  position: absolute;
  top: 500px;
  left: 90px;
  padding: 16px 120px 16px 120px;
  background-color: #f43f5e;
  border-radius: 40px;
  font-size: 20px;
  font-weight: bolder;
  color: white;
  animation: ${Ani2} 1s ease;
`;
