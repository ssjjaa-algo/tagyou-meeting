import React, { useCallback, useEffect, useState } from "react";
import * as S from './Tags.styled';
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";

const Tags = (data: any) => {
  const isBrowser = typeof window !== 'undefined';
  const theme : themeProps = useTheme();
  // console.log(data.hobby)
  const [hashtag, setHashtag] = useState<string>('')
  const [hashArr, setHashArr] = useState<string[]>([])  

  useEffect(() => {
    const $HashWrapOuter = document.querySelector('.HashWrapOuter')
    const $HashWrapInner_before = document.createElement('div')
    $HashWrapInner_before.className = 'HashWrapInner'
    if (data.hobby !== undefined) {
      $HashWrapInner_before.innerHTML = '#' + data.hobby
      $HashWrapOuter?.appendChild($HashWrapInner_before)
    }
  }, [data.hobby])

  const onKeyUp = useCallback(
    (e:React.KeyboardEvent<HTMLInputElement>) => {
      if (isBrowser) {
        /* 요소 불러오기, 만들기*/
        const $HashWrapOuter = document.querySelector('.HashWrapOuter')
        const $HashWrapInner = document.createElement('div')
        $HashWrapInner.className = 'HashWrapInner'
        
        /* 태그를 클릭 이벤트 관련 로직 */
        $HashWrapInner.addEventListener('click', () => {
          $HashWrapOuter?.removeChild($HashWrapInner)
          setHashArr(hashArr.filter((hashtag) => hashtag))
        })

        /* enter 키 코드 :13 */
        if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
          $HashWrapInner.innerHTML = '#' + e.currentTarget.value
          $HashWrapOuter?.appendChild($HashWrapInner)
          setHashArr((hashArr) => [...hashArr, hashtag])
          setHashtag('')
        }
      }
    },
    [hashArr]
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
        theme={theme}
        className="HashInput"
        type="text"
        value={hashtag}
        onChange={onChangeHashtag}
        onKeyUp={onKeyUp}
        placeholder="취미 추가하기"
      />
    </>
  );
};

export default Tags;
