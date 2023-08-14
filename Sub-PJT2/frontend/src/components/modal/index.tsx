import * as S from "./modal.styled";
import kakaoImg from "../../asset/img/kakao_login_medium_wide.png";
import logoImg from "../../asset/img/logo/2.png";
import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { TokenValue } from "atoms/atoms";

type modalProps = {
  handleOnClick: () => void;
  setShowModal: (value: boolean) => void;
  formType: "login" | "logout";
};

export const Modal = ({
  handleOnClick,
  setShowModal,
  formType,
}: modalProps) => {
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [, , removeCookie] = useCookies(["Auth"]);
  const [token, setToken] = useRecoilState(TokenValue);
  const handleLogout = () => {
    removeCookie("Auth");
    setToken("");
    window.location.href = "/";
  };

  return (
    <S.ModalWrapper onClick={handleCloseModal}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.CloseIconStyled onClick={handleCloseModal} />
        <S.LogoImg src={logoImg} alt="logo" />
        {formType === "login" ? (
          <S.KakaoImg src={kakaoImg} onClick={handleOnClick} />
        ) : (
          <S.LogoutBtn onClick={handleLogout}>로그아웃</S.LogoutBtn>
        )}
      </S.ModalContent>
    </S.ModalWrapper>
  );
};
