import * as S from "./Postit.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import CreateDOM from 'react-dom/client';

const Postit = () => {
  const theme: themeProps = useTheme();
  // const root = CreateDOM.createRoot(document.getElementById('stickies') as HTMLUListElement);
  // const stickiesContainer = document.getElementById('stickies') as HTMLUListElement;

  function init() {
    const button = document.getElementById("add_button") as HTMLButtonElement;
    button.onclick = createSticky;

    const stickiesArray = getStickiesArray();
    for (let i = 0; i < stickiesArray.length; i++) {
      const key = stickiesArray[i];
      const value = JSON.parse(localStorage[key]);
      addStickyToDOM(key, value);
    }
  }

  let stickiesArray: string[] = [];
  function getStickiesArray(): string[] {
    const storedStickiesArray = localStorage.getItem("stickiesArray");
    if (!storedStickiesArray) {
      localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
    } else {
      stickiesArray = JSON.parse(storedStickiesArray);
    }
    return stickiesArray;
  }

  function createSticky() {
    const stickiesArray = getStickiesArray();
    const value = (document.getElementById("note_text") as HTMLInputElement).value;
    const colorSelectObj = document.getElementById("note_color") as HTMLSelectElement;
    const index = colorSelectObj.selectedIndex;
    const color = colorSelectObj.options[index].value;

    const currentDate = new Date();
    const key = "sticky_" + currentDate.getTime();
    const stickyObj = {
      value: value,
      color: color,
    };
    localStorage.setItem(key, JSON.stringify(stickyObj));

    stickiesArray.push(key);
    localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));

    addStickyToDOM(key, stickyObj);
  }

  function deleteSticky(e: React.MouseEvent<HTMLDivElement>, key: string) {
    let stickiesArray = getStickiesArray();
    if (stickiesArray) {
      for (let i = 0; i < stickiesArray.length; i++) {
        if (key === stickiesArray[i]) {
          stickiesArray.splice(i, 1);
        }
      }

      localStorage.removeItem(key);
      localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
      removeStickyFromDOM(key);
    }
  }

  function addStickyToDOM(key: string, stickyObj: { value: string; color: string }) {
    const stickies = document.getElementById("stickies") as HTMLUListElement;

    const newSticky = (
      <S.StickyCard
        id={key}
        style={{ backgroundColor: stickyObj.color }}
        theme={theme}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => deleteSticky(e, key)}
      >
        <span className="sticky">{stickyObj.value}</span>
      </S.StickyCard>
    );

    const root = CreateDOM.createRoot(stickies);
    // root.render(newSticky);
  }

  function removeStickyFromDOM(key: string) {
    const sticky = document.getElementById(key) as HTMLElement;
    sticky.parentNode?.removeChild(sticky);
  }

  window.onload = init;

  return (
    <>
    <S.InputContainer>
    <S.Label htmlFor="note_color" theme={theme}>색상</S.Label>
    <S.Select id="note_color">
      <option value="LightGoldenRodYellow">노란색</option>
      <option value="PaleGreen">녹색</option>
      <option value="LightPink">분홍</option>
      <option value="LightBlue">파란색</option>
    </S.Select>
    <S.Label htmlFor="note_color" theme={theme}>내용</S.Label>
    <S.Input id="note_text" theme={theme} required maxLength={50}></S.Input>
    <S.Add theme={theme} id="add_button">작성하기</S.Add>
    </S.InputContainer>
    <S.Container>
    <ul id="stickies"></ul>


    {/* <S.Card theme={theme}> */}
      {/* 오늘은 즐거운 월요일 정말 즐겁다 즐거워 화이팅 냐냐냐냐ㅑ냐냐냐냐냐냥 */}
      {/* <S.Save theme={theme}>저장</S.Save> */}
    {/* </S.Card> */}
    {/* <S.Card theme={theme}> */}
      {/* hi */}
      {/* <S.Save theme={theme}>저장</S.Save> */}
    {/* </S.Card> */}
    </S.Container>
    
    </>
  );
};
export default Postit;
