import * as S from "./Button.styled";
import { useState } from "react";
import styled from "@emotion/styled";

import { Modal } from "components/modal";

export const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
export const REDIRECT_URI = "http://localhost:3000/test";

type btnProps = {
  content: string;
};

const Button = ({ content }: btnProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=c71b1bd787bb5e0cf1b518439fd70c44&redirect_uri=http://localhost:3000/home&response_type=code`;
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URI;
  };

  return (
    <div>
      <S.Button onClick={handleOpenModal}>{content}</S.Button>
      {showModal && (
        <Modal
          handleOnClick={handleLogin}
          setShowModal={setShowModal}
          formType="login"
        />
      )}
    </div>
  );
};

export default Button;
