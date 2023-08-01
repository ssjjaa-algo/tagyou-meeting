import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";

export const Container = styled.div`
  /* border: solid red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: fit-content;
`;

export const CanvasBox = styled.div<{ theme: themeProps }>`
  border: solid 3px ${(props) => props.theme.point.light};
  border-radius: 0.4rem;
  background-color: ${(props) => props.theme.point.mid};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
  padding: 2rem;
  min-height: 50rem;
  margin: 0 1rem 0 1rem;
`;

export const Canvas = styled.canvas<{ theme: themeProps }>`
  /* border: solid green; */
  border-radius: 0.4rem;
  background-color: white;
`;

export const PaletteBody = styled.div<{ theme: themeProps }>`
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  background-color: ${(props)=>props.theme.point.light};
`;

export const Palette = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 5rem;
  width: 50rem;
`;

export const PaletteColor = styled.div`
  border: solid black 2px;
  border-radius: 0.7rem;
  padding: 1rem;
  margin: 0.5rem;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    border: solid black 3px;
    opacity: 1;
  }
`;

export const Body = styled.div`
  /* border: solid yellow; */
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const PlayerVidBundle = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 2rem;
  padding: 2rem 0 2rem 0;
`;

export const PlayerVid = styled.div`
  border: solid red;
  display: flex;
  width: 70%;
  height: 40%;
  min-width: 15rem;
  min-height: 10rem;
`;
