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
  z-index: 9999;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 800px;
  height: 300px;
  display: flex;
  flex-direction: column;
  position: relative;
`;
export const MainContainer = styled.div<{ theme: themeProps }>`
  width: 250px;
  background-color: ${(props) => props.theme.bg.deep};
`;

export const Container = styled.div`
  padding: 22px 16px 20px 16px;
`;

export const Title = styled.div`
  color: black;
  font-size: 18px;
  font-weight: 600;
`;

export const SubTitle = styled(Title)`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 600;
  vertical-align: center;
`;

export const FriendContainer = styled.div`
  height: 250px;
  overflow-y: auto;
  border-bottom: solid 1px white;
  margin-bottom: 20px;
`;

export const Tmp = styled.span`
  font-weight: light;
  font-size: 12px;
  color: black;
`;

export const OtherFriendContainer = styled(FriendContainer)`
  height: 100px;
  overflow-y: auto;
  border-bottom: solid 1px white;
`;

export const NullMessageBox = styled.div`
  display: flex;
  justify-content: center;
  vertical-align: center;
`;

export const NullMessage = styled.div`
  color: black;
  margin: auto;
  margin-top: 110px;
  font-size: 12px;
`;

export const SpecialNullMessage = styled(NullMessage)`
  margin-top: 35px;
`;

export const Des = styled(Title)`
  font-size: 12px;
  font-weight: 500;
`;

export const SpecialDes = styled(Des)`
  font-size: 12px;
  font-weight: 500;
  margin-top: 5px;
`;
