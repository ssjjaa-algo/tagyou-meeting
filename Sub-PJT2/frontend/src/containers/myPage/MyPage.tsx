import React, { useState, ChangeEvent } from "react";
import * as S from "./MyPage.styled";
import Dropdown_Adr from "./Dropdown_Address/Dropdown_Adr"
import Dropdown_MBTI from "./Dropdown_MBTI/Dropdown_MBTI"

const MyPage: React.FC = () => {
  const [nickname, setNickname] = useState<string>("");
  const [job, setJob] = useState<string>("");
  const [pw, setPw] = useState({ 
    type: 'password',
    visible: false
  }) 
  const [newpw, setNewpw] = useState<string>("");
  const [pwcheck, setPwcheck] = useState<string>("");
  // const [hidePw, setHidePw] = useState(true)
  // const [hideNewPw, setHideNewPw] = useState(true)
  // const [hidePwCheck, setHidePwCheck] = useState(true)
  const HandlePw = () => {
    setPw(() => {
      if (pw.visible) {
        return { type: 'text', visible: true};
      }
      return { type: 'password', visible: false}
    })
  }
  // const toggleHideNewPw = () => {
  //   setHideNewPw(!hideNewPw)
  // }
  // const toggleHidePwCheck = () => {
  //   setHidePwCheck(!hidePwCheck)
  // }

  const name_input = document.getElementById('nickname') as HTMLInputElement
  
  const changeInput_name = (e: ChangeEvent<typeof name_input>) => {
    setNickname(e.target.value);
  };

  const changeInput_job = (e: ChangeEvent<typeof name_input>) => {
    setJob(e.target.value);
  };
  
  const changeInput_pw = (e: ChangeEvent<typeof name_input>) => {
    // setPw(e.target.value);
  };
  
  const changeInput_newpw = (e: ChangeEvent<typeof name_input>) => {
    setNewpw(e.target.value);
  };

  const changeInput_pwcheck = (e: ChangeEvent<typeof name_input>) => {
    setPwcheck(e.target.value);
  };

  return (
    <>
    <S.Container>
      <S.Title>내 정보 수정</S.Title>

      <S.InputArea>
        <S.miniTitle>닉네임</S.miniTitle>
        <S.Input
          id="nickname"
          type="text"
          value={nickname}
          onChange={changeInput_name}
          placeholder="닉네임"
        />
        <S.Button>중복체크</S.Button>
      </S.InputArea>
      <S.InputArea>
        <S.miniTitle>주소지</S.miniTitle>
        <Dropdown_Adr></Dropdown_Adr>
      </S.InputArea>
      <S.InputArea>
        <S.miniTitle>MBTI</S.miniTitle>
        <Dropdown_MBTI></Dropdown_MBTI>
      </S.InputArea>
      <S.InputArea>
        <S.miniTitle>직업</S.miniTitle>
        <S.Input
          id="job"
          type="text"
          value={job}
          onChange={changeInput_job}
          placeholder="직업"
        />
      </S.InputArea>
      <S.SaveButton>변경사항 저장</S.SaveButton>
    </S.Container>
    <S.Container>
      <S.Title>비밀번호 변경</S.Title>
      <S.InputArea>
        <S.miniTitle>현재 비밀번호</S.miniTitle>
        <S.Input
          id="pw"
          type="password"
          onClick={HandlePw}
          onChange={changeInput_pw}
          placeholder="현재 비밀번호"
        />
        
      </S.InputArea>
      <S.InputArea>
        <S.miniTitle>새 비밀번호</S.miniTitle>
        <S.Input
          id="newpw"
          type="password"
          value={newpw}
          onChange={changeInput_newpw}
          placeholder="새 비밀번호"
        />
        <S.Notice>비밀번호는 8~20자 이내, 숫자/특수문자/영문대소문자를 사용해주세요.</S.Notice>
      </S.InputArea>
      <S.InputArea>
        <S.miniTitle>비밀번호 확인</S.miniTitle>
        <S.Input
          id="pwcheck"
          type="password"
          value={pwcheck}
          onChange={changeInput_pwcheck}
          placeholder="새 비밀번호 확인"
        />
      <S.Button>변경사항 저장</S.Button>
      </S.InputArea>
    </S.Container>
    </>
  );
};

export default MyPage;
