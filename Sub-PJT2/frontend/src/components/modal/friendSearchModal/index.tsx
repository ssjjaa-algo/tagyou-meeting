import * as S from "./modal.styled";
import logoImg from "../../../asset/img/logo/2.png";
import { useRecoilState } from "recoil";
import { TokenValue } from "atoms/atoms";
import { useState } from "react";

type modalProps = {
  setShowModal: (value: boolean) => void;
};

export const FriendSearchModal = ({ setShowModal }: modalProps) => {
  const [token, setToken] = useRecoilState(TokenValue);
  const [searchName, setSearchName] = useState<string>();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const searchFriend = () => {
    console.log("zz");
    // //searchName를 넣어 api 요청하도룩 수정해야함
    // console.log("searchFriend api 실행 전 token 확인", token);
    // const fetchSearchFriendByName = async () => {
    //   fetch(`${process.env.REACT_APP_BASE_URL}`, {
    //     headers: {
    //       Auth: token,
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((res) => console.log(res));
    // };
    // token && fetchSearchFriendByName();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    setSearchName(inputValue);
  };

  return (
    <S.ModalWrapper>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.CloseIconStyled onClick={handleCloseModal} />
        <S.LogoImg src={logoImg} alt="logo" />
        <S.StyledInput
          onChange={handleChange}
          placeholder="이름으로 친구 검색"
        ></S.StyledInput>
        <S.RequestBtn onClick={searchFriend}>검색하기</S.RequestBtn>
      </S.ModalContent>
    </S.ModalWrapper>
  );
};
