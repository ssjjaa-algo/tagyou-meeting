import { useRecoilValue } from "recoil";
import * as S from "./index.styled";
import { NomalFriendList } from "atoms/atoms";
import Friend from "components/friend";
import { friendProps } from "types/types";
import { useEffect } from "react";
export const GroupModal = () => {
  const nomalFriendList = useRecoilValue(NomalFriendList);
  // export const GroupModal = ({
  //   setShowModal,
  // }: {
  //   setShowModal: (value: boolean) => void;
  // }) => {

  useEffect(() => {
    console.log("nomalFriendList", nomalFriendList);
  }, [nomalFriendList]);
  return (
    // <S.ModalWrapper onClick={() => setShowModal(false)}>
    <S.ModalWrapper>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.CloseIconStyled />
        {/* <S.CloseIconStyled onClick={() => setShowModal(false)} /> */}
        <S.SubTitle>
          친구목록 <S.Tmp>{nomalFriendList.length}명</S.Tmp>
        </S.SubTitle>
        <S.FriendContainer>
          {nomalFriendList.length > 0 ? (
            nomalFriendList?.map((item: friendProps, idx: number) => (
              <Friend
                friendShipStatus={item.friendShipStatus}
                targetId={item.targetId}
                targetName={item.targetName}
                targetImageUrl={item.targetImageUrl}
                key={idx}
              />
            ))
          ) : (
            <S.NullMessageBox>
              <S.NullMessage> 친구가 없어요 </S.NullMessage>
            </S.NullMessageBox>
          )}
        </S.FriendContainer>
      </S.ModalContent>
    </S.ModalWrapper>
  );
};
