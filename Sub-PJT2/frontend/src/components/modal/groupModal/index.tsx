import * as S from "./modal.styled";

export const GroupModal = ({
  setShowModal,
}: {
  setShowModal: (value: boolean) => void;
}) => {
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <S.ModalWrapper onClick={handleCloseModal}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.CloseIconStyled onClick={handleCloseModal} />
      </S.ModalContent>
    </S.ModalWrapper>
  );
};
