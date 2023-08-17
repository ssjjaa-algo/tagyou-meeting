import { useRecoilValue } from "recoil";
import * as S from "./index.styled";
import { NomalFriendList } from "atoms/atoms";
import Friend from "components/friend";
import { friendProps } from "types/types";
import { useEffect, useState } from "react";
import RoomBtn from "components/roomBtn";

type stateType = "default" | "make" | "view";

export const GroupModal = ({
  setShowModal,
}: {
  setShowModal: (value: boolean) => void;
}) => {
  const nomalFriendList = useRecoilValue(NomalFriendList);
  const [showState, setShowState] = useState<stateType>("default");
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
          {showState === "make" && <div>make</div>}

          {showState === "view" && <div>view</div>}
        </S.BtnContainer>
        <div style={{ display: "flex", margin: "auto" }}>
          <button content="미팅시작" />
        </div>
      </S.ModalContent>
    </S.ModalWrapper>
  );
};
