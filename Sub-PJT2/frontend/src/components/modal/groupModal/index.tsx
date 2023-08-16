import * as S from "./modal.styled";

export const GroupModal = ({
  setShowModal,
}: {
  setShowModal: (value: boolean) => void;
}) => {
  return (
    <S.ModalWrapper onClick={() => setShowModal(false)}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.CloseIconStyled onClick={() => setShowModal(false)} />
      </S.ModalContent>
    </S.ModalWrapper>
  );
};
