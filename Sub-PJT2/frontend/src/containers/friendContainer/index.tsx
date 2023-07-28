import { IsOpen } from "atoms/atoms";
import Friend from "components/friend";
import Drawer from "react-modern-drawer";
import { useRecoilState } from "recoil";
import * as S from "./friendContainer.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { friendProps } from "types/types";
import NestedModal from "components/freindRequestModal";

const FriendContainer = () => {
  const [isOpen, setIsOpen] = useRecoilState(IsOpen);
  const [friendList, setFriendList] = useState<friendProps[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      fetch("friends/list")
        .then((res) => res.json())
        .then((data) => {
          setFriendList(data);
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const [showModal, setShowModal] = useState<boolean>(false);
  const handleRequestFriend = () => {
    setShowModal((cur) => !cur);
  };

  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      direction="right"
      overlayOpacity={0}
    >
      <S.Container>
        <h1>친구목록</h1>
        {friendList?.map((item: friendProps, idx: number) => (
          <Friend id={item.id} name={item.name} src={item.src} key={idx} />
        ))}
        {/* {showModal && NestedModal} */}
        <button onClick={handleRequestFriend}>친구요청</button>
      </S.Container>
    </Drawer>
  );
};

export default FriendContainer;
