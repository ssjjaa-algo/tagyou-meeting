import styled from "@emotion/styled";

export const Container = styled.div`
  border: solid red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: fit-content;
`;

export const Canvas = styled.canvas`
  border: solid green;
  background-color: white;
`;

export const Palette = styled.div`
  border: solid green;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const PaletteColor = styled.div`
  border: solid black 1px;
  border-radius: 0.7rem;
  padding: 1rem;
  margin: 0.5rem;
`;

export const Body = styled.div`
  border: solid yellow;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

export const PlayerVidBundle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PlayerVid = styled.div`
  border: solid red;
`;
