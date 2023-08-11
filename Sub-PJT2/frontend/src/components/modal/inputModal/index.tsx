import * as S from "./index.styled";
import logoImg from "../../../asset/img/logo/2.png";
import Datepicker from "components/datepicker";
import SelectBox from "components/selectbox";
import { useState } from "react";
import { profileProps, userProps } from "types/types";
import { ProfileInfo, UserInfo } from "atoms/atoms";
import { useRecoilState } from "recoil";

type inputModalProps = {
  setShowModal: (value: boolean) => void;
};

const InputModal = ({ setShowModal }: inputModalProps) => {
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);
  const [profileInfo, setProfileInfo] = useRecoilState(ProfileInfo);

  const handleCloseModal = () => {
    setShowModal(false); //부모가 보내준 함수를 사용, 즉 부모에서 이 모달을 여닫을 변수를 관리하는 것
  };

  const handleInputChange = (
    source: "phoneNumber" | "content" | "userHobby" | "userJob",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    source === "phoneNumber" &&
      setUserInfo({ ...userInfo, [source]: Number(e.target.value) });
    source !== "phoneNumber" &&
      setProfileInfo({ ...profileInfo, [source]: e.target.value });
  };

  const handleOnClick = () => {
    console.log(userInfo);
    console.log(profileInfo);
    window.location.href = "http://localhost:3000/mypage";
  };

  return (
    <S.ModalWrapper onClick={handleCloseModal}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.LogoImg src={logoImg} alt="logo" />
        <S.Title>기본정보</S.Title>
        <S.UserBox>
          <S.Section>
            <S.SubTitle> 성별 </S.SubTitle>
            <SelectBox name="userGender" />
          </S.Section>

          <S.Section>
            <S.SubTitle> 생일 </S.SubTitle>
            <Datepicker name="userAge" />
          </S.Section>

          <S.Section>
            <S.SubTitle> 번호 </S.SubTitle>
            <S.StyledInput
              onChange={(e) => handleInputChange("phoneNumber", e)}
              placeholder="휴대폰 번호 ( - 없이 입력)"
            />
          </S.Section>
        </S.UserBox>

        <S.Title source="profile">선택정보</S.Title>
        <S.ProfileBox>
          <S.Section>
            <S.SubTitle> 주소 </S.SubTitle>
            <SelectBox name="userSido" />
            <SelectBox name="userGugun" />
          </S.Section>

          <S.Section>
            <S.SubTitle> 소개 </S.SubTitle>
            <S.StyledInput
              onChange={(e) => handleInputChange("content", e)}
              placeholder="한줄 소개"
            />
          </S.Section>

          <S.Section>
            <S.SubTitle> 취미 </S.SubTitle>
            <S.StyledInput
              // onChange={(e) => handleInputChange("userHobby", e)}
              placeholder="취미"
            />
          </S.Section>

          <S.Section>
            <S.SubTitle> 직업 </S.SubTitle>
            <S.StyledInput
              // onChange={(e) => handleInputChange("userJob", e)}
              placeholder="직업"
            />
          </S.Section>

          <S.Section>
            <S.SubTitle> MBTI </S.SubTitle>
            <SelectBox name="userMbti" />
          </S.Section>
        </S.ProfileBox>

        <S.Button onClick={handleOnClick}>입력완료</S.Button>
      </S.ModalContent>
    </S.ModalWrapper>
  );
};

export default InputModal;
