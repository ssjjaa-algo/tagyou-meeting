import React, { useCallback, useEffect, useState } from "react";
import { getProfileProps } from "types/types";
import * as S from './Tags.styled';
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";

const Tags = () => {
  const isBrowser = typeof window !== 'undefined';
  const theme : themeProps = useTheme();
  
  const [profileData, setProfileData] = useState<getProfileProps>();
  const [hashtag, setHashtag] = useState<string>('')
  const [hashArr, setHashArr] = useState<string[]>(profileData?.hobby ? [profileData?.hobby] : [])  
  
  const onKeyUp = useCallback( // hashtag, hashArr이 변경될 때마다 함수 재생성
    (e :React.KeyboardEvent<HTMLInputElement>) => {
      if (isBrowser) {
        /* 요소 불러오기, 만들기*/
        const $HashWrapOuter = document.querySelector('.HashWrapOuter') as HTMLElement
        const $HashWrapInner = document.createElement('div')
        $HashWrapInner.className = 'HashWrapInner'

        /* 태그를 클릭 이벤트 관련 로직 */
        $HashWrapInner.addEventListener('click', () => {
        $HashWrapOuter?.removeChild($HashWrapInner)
        // setHashArr(hashArr.filter((hashtag) => hashtag))
        // setHashArr(hashArr.filter((hashtag) => hashtag))
      })
      /* enter 키 코드 :13 */
      if (e.keyCode === 13 && e.currentTarget.value.trim() !== '') {
        console.log('Enter Key 입력됨!', e.currentTarget.value)
        $HashWrapInner.innerHTML = '#' + e.currentTarget.value
        $HashWrapOuter?.appendChild($HashWrapInner)
        setHashArr((hashArr) => [...hashArr, hashtag])
        setHashtag('')
      }
      }
    },
    [hashtag, hashArr],
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
