import * as S from "./Button.styled";

import { useEffect, useState } from "react";
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import kakaoImg from "../../asset/img/kakao_login_medium_wide.png";
import logoImg from "../../asset/img/logo/2.png";
import CloseIcon from "@mui/icons-material/Close";

export const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
export const REDIRECT_URI = "http://localhost:3000/test";

// 스타일드 컴포넌트를 사용하여 모달 스타일을 정의합니다.
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 400px;
  height: 300px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const KakaoImg = styled.img`
  width: 280px;
  margin: 30px auto 60px auto;
  position: absolute;
  top: 140px;
  left: 60px;
`;

const Ani = keyframes`
  from {
    top: 50px;
  }
  to {
    top: 40px;
  }
`;

const LogoImg = styled.img`
  width: 200px;
  margin: 60px auto 0 auto;
  position: absolute;
  top: 40px;
  left: 100px;
  animation: ${Ani} 1s ease;
`;

const CloseIconStyled = styled(CloseIcon)`
  margin-left: auto;
`;

type btnProps = {
  content: string;
};

const Button = ({ content }: btnProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=c71b1bd787bb5e0cf1b518439fd70c44&redirect_uri=http://localhost:3000/home&response_type=code`;
  // 카카오 계정 사용 동의화면으로 가는 url 여기에 위에 설정한 값들이 들어갑니다.
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URI; // url 주소 변경
  };

  return (
    <div>
      <S.Button onClick={handleOpenModal}>{content}</S.Button>
      {showModal && (
        <ModalWrapper onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseIconStyled onClick={handleCloseModal} />
            <LogoImg src={logoImg} alt="logo" />
            <KakaoImg src={kakaoImg} onClick={handleLogin} />
          </ModalContent>
        </ModalWrapper>
      )}
    </div>
  );
};

export default Button;
