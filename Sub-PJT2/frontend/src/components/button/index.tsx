import * as S from "./Button.styled";
import { useState } from "react";

import { Modal } from "components/modal";

type btnProps = {
  content: string;
};

const Button = ({ content }: btnProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleLogin = () => {
    const KAKAO_AUTH_URI =
      "https://tagyou.site/api/oauth2/authorization/kakao";
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
