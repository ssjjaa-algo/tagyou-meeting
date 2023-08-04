import React, { useCallback, useState } from "react";
import * as S from './Tags.styled';
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";

const Tags = (data: any) => {
  // const isBrowser = typeof window !== 'undefined';
  const theme : themeProps = useTheme();
  // console.log(data.hobby)
  const [hashtag, setHashtag] = useState<string>('')
  const [hashArr, setHashArr] = useState<string[]>([])  

  /* 요소 불러오기, 초기값 넣기*/
  const $HashWrapOuter = document.querySelector('.HashWrapOuter') as HTMLElement
  const $HashWrapInner = document.createElement('div')
  $HashWrapInner.className = 'HashWrapInner'
  console.log(data.hobby)
  $HashWrapInner.innerHTML = '#' + data.hobby 
  // console.log($HashWrapInner)
  $HashWrapOuter?.appendChild($HashWrapInner)

  /* 태그 클릭 이벤트 관련 로직 */
  $HashWrapInner.addEventListener('click', () => {
  $HashWrapOuter?.removeChild($HashWrapInner)})

  const onKeyUp = useCallback( // hashtag, hashArr이 변경될 때마다 함수 재생성
    (e :React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
        console.log('Enter Key 입력됨!', e.currentTarget.value)
        $HashWrapInner.innerHTML = '#' + e.currentTarget.value
        $HashWrapOuter?.appendChild($HashWrapInner)
        setHashArr((hashArr) => [...hashArr, hashtag])
        setHashtag('')
      }
    },
    [hashArr],
  )
  
  const onChangeHashtag = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setHashtag(e.target.value);
    },
    []
  );

  return (
    <>
    <S.HashWrap theme={theme}>
      <div className="HashWrapOuter"></div>
    </S.HashWrap>
      <S.HashInput
        className="HashInput"
        type="text"
        value={hashtag}
        onChange={onChangeHashtag}
        onKeyUp={onKeyUp}
        placeholder="해시태그 입력"
      />
    </>
  );
};

export default Tags;
