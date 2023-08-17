import { useRecoilValue } from "recoil";
import * as S from "./index.styled";
import { GroupResDto, InvitedList, NomalFriendList } from "atoms/atoms";
import { friendProps, groupResDtoType } from "types/types";
import { useEffect, useState } from "react";
import RoomBtn from "components/roomBtn";
import RoomFriend from "components/roomFriend";
import InvitedRoom from "components/inviteRoom";

type stateType = "default" | "make" | "view";

export const GroupModal = ({
  setShowModal,
}: {
  setShowModal: (value: boolean) => void;
}) => {
  const nomalFriendList = useRecoilValue(NomalFriendList);
  const [showState, setShowState] = useState<stateType>("default");
  const groupInfo = useRecoilValue(GroupResDto);
  const invitedGroupList = useRecoilValue(InvitedList);

  useEffect(() => {
    console.log("nomalFriendList", nomalFriendList);
  }, [nomalFriendList]);

  return (
    <S.ModalWrapper onClick={() => setShowModal(false)}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.CloseIconStyled onClick={() => setShowModal(false)} />
        <S.BtnContainer>
          {showState === "default" && (
            <>
              <RoomBtn
                content="🎈 그 룹 생 성 🎈"
                source="make"
                setShowState={setShowState}
              />
              <RoomBtn
                source="view"
                content="🎉 받 은 초 대 🎉"
                setShowState={setShowState}
              />
            </>
          )}
          {showState === "make" && (
            <S.Container>
              <S.FriendContainer>
                <S.Title> 내 그룹 정보</S.Title>
                {groupInfo.groupGender}
                {groupInfo.groupId}
              </S.FriendContainer>
              <S.FriendContainer>
                <S.Title> 초대할 수 있는 친구들 </S.Title>
                {nomalFriendList.length > 0 &&
                  nomalFriendList?.map((item: friendProps, idx: number) => (
                    <>
                      {item.userGender === groupInfo.groupGender && (
                        <RoomFriend
                          friendShipStatus={item.friendShipStatus}
                          targetId={item.targetId}
                          targetName={item.targetName}
                          targetImageUrl={item.targetImageUrl}
                        />
                      )}
                    </>
                  ))}
              </S.FriendContainer>
            </S.Container>
          )}

          {showState === "view" && (
            <div>
              <S.Container>
                <S.FriendContainer>
                  <S.Title> 요청 받은 그룹 </S.Title>
                  {invitedGroupList.length > 0 &&
                    invitedGroupList?.map(
                      (item: groupResDtoType, idx: number) => (
                        <InvitedRoom
                          groupUser={item.groupUser}
                          groupGender={item.groupGender}
                          groupId={item.groupId}
                          roomId={item.roomId}
                        ></InvitedRoom>
                      )
                    )}
                  {groupInfo.groupGender}
                  {groupInfo.groupId}
                </S.FriendContainer>
              </S.Container>
            </div>
          )}
        </S.BtnContainer>
        <div style={{ display: "flex", margin: "auto" }}>
          <button content="미팅시작" />
        </div>
      </S.ModalContent>
    </S.ModalWrapper>
  );
};
