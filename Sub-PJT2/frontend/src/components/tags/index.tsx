import React, { useCallback, useEffect, useState } from "react";
import * as S from './Tags.styled';
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { useRecoilValue } from "recoil";
import { TokenValue } from "atoms/atoms";

const Tags = () => {
  const isBrowser = typeof window !== 'undefined';
  const theme : themeProps = useTheme();
  const [hashtag, setHashtag] = useState<string>('')
  const [hashArr, setHashArr] = useState<string[]>([])
  const token = useRecoilValue(TokenValue);

  useEffect(() => {
    const $HashWrapOuter = document.querySelector('.HashWrapOuter')
    const $HashWrapInner_before = document.createElement('div')
    $HashWrapInner_before.className = 'HashWrapInner'
    if (hashtag !== undefined) {
      $HashWrapInner_before.innerHTML = '#' + hashtag
      $HashWrapOuter?.appendChild($HashWrapInner_before)
      let new_content = hashtag
      // console.log(new_content+'ddd')


      /* 태그를 클릭 이벤트 관련 로직 */
      $HashWrapInner_before.addEventListener('click', () => {
      $HashWrapOuter?.removeChild($HashWrapInner_before)
      setHashArr(hashArr.filter((hashtag) => hashtag))
      // let new_content = new_content.replace(data.hobby, 'ff')
      // console.log(new_content)
    })
    }
  }, [hashtag, hashArr])


  useEffect(() => {
		// console.log 찍는 코드 없애지 않고 둬서 디버깅 할 때 좋게합니다
		console.log("hobby api 실행 전 token 확인", token)
    const fetchHobbySrc = async () => {
      fetch(`${process.env.REACT_APP_BASE_URL}/profile/hobby`, {
        headers: {
          Auth: token,
        },
      })
        .then((response) => response.json())
        .then((res) => { for (let i = 0; i < res.length; i++) {
          setHashArr([...hashArr], res[i]["hobby"]) }})
        }
    
    token && fetchHobbySrc();
  }, [token]);

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
          
          
          // console.log('/' + e.currentTarget.value)
          setHashArr((hashArr) => [...hashArr, hashtag])
          setHashtag('')
          /* '취미1/취미2/취미3' 의 형태로 content 변경해서 PUT 요청 보내기 */
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
