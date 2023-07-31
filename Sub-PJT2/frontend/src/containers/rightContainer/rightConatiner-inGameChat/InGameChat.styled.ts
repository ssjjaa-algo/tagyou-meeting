import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";

export const Container = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: row-reverse;
  width: 100vw;
  height: 100vh;
`;

export const ChatRoomMain = styled.div`
  /* border: dotted black; */
  display: flex;
  flex-direction: row;
  width: fit-content;
  /* align-items: flex-end; */
  height: calc(100vh - 3.5rem);
  min-height: 30rem;
  margin: 2rem 3rem 0 0;
`;

export const MessageButton = styled.button<{ theme: themeProps }>`
  /* border: solid black; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 2.5rem !important;
  height: 2.5rem !important;
  background-color: ${(props) => props.theme.point.deep};
  position: relative;
  top: 1rem;
  left: 1.5rem;
`;
export const MessageImg = styled.img`
  width: 90%;
  height: 60%;
`;

export const ChatRoomMainBox = styled.div<{ theme: themeProps }>`
  /* border: solid pink; */
  display: none;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.point.light};
  width: 20rem;
  height: 90%;
  margin: 2rem 0 2rem 0;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
`;

export const ChatRoomMainChats = styled.div`
  /* border: solid purple; */
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  height: 90%;
  padding: 1rem 1rem 0 1rem;
  overflow-y: auto;
`;

export const ChatRoomMainChatsContent = styled.div`
  /* border: dotted black; */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1rem 0 0rem;
`;

export const Messages = styled.div`
  /* border: solid black; */
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  margin: 0.5rem 1rem 1rem 0.5rem;
  word-break: break-all;
`;

export const ChatRoomMainInput = styled.div<{ theme: themeProps }>`
  /* border: solid green; */
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5rem;
  padding: 1rem 1.5rem 1rem 1.5rem;
`;

export const Button = styled.button<{ theme: themeProps }>`
  background-color: ${(props) => props.theme.point.deep};
  border: none;
  border-radius: 0.5rem;
  width: 3rem;
  height: 2.5rem;
`;
