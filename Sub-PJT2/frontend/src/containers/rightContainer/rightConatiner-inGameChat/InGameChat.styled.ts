import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";

export const Container = styled.div``;

export const ChatRoom = styled.div<{ theme: themeProps }>`
  /* border: solid black; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: calc(100vh - 3.5rem);
  min-width: fit-content;
  min-height: fit-content;
  margin-top: 1rem;
`;

export const ChatRoomMain = styled.div`
  /* border: dotted black; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30%;
  min-width: 20rem;
  min-height: 30rem;
`;

export const ChatRoomMainBox = styled.div<{ theme: themeProps }>`
  /* border: solid pink; */
  background-color: ${(props) => props.theme.point.light};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 90%;
  margin-bottom: 2rem;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
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
  top: 1.5rem;
  left: -1rem;
`;
export const MessageImg = styled.img`
  width: 90%;
  height: 60%;
`;

export const ChatRoomMainChats = styled.div`
  // border: solid purple;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 90%;
  padding-top: 1rem;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const ChatRoomMainChatsContent = styled.div`
  /* border: dotted black; */
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem 0 1rem;
`;

export const ChatBegins = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  width: 100%;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
  font-size: large;
  font-weight: bold;
  color: grey;
`;

export const Line = styled.div`
  background-color: grey;
  width: 30%;
  height: 0.1rem;
`;

export const Messages = styled.div`
  /* border: solid black; */
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0.5rem 1rem 1rem 0.5rem;
`;

export const ChatRoomMainInput = styled.div<{ theme: themeProps }>`
  /* border: solid green; */
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 5rem;
  padding: 1rem 1.5rem 1rem 1.5rem;
`;

export const Button = styled.button<{ theme: themeProps }>`
  background-color: ${(props) => props.theme.point.deep};
  border: none;
  border-radius: 0.5rem;
  width: 100%;
  height: 100%;
`;
