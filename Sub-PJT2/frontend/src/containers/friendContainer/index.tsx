import { IsOpen } from "atoms/atoms";
import Friend from "components/friend";
import Drawer from "react-modern-drawer";
import { useRecoilState } from "recoil";
import * as S from "./friendContainer.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { friendProps } from "types/types";

const FriendContainer = () => {
  const theme = useTheme<themeProps>();
  const [isOpen, setIsOpen] = useRecoilState(IsOpen);
  const [friendList, setFriendList] = useState<friendProps[]>();
  const [loading, setLoading] = useState(true);

  const style: React.CSSProperties = {
    backgroundColor: theme.bg.deep,
  };

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

  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      direction="right"
      overlayOpacity={0}
      style={style}
    >
      <S.Container>
        <S.Title theme={theme}>친구목록</S.Title>
        {friendList?.map((item: friendProps, idx: number) => (
          <Friend id={item.id} name={item.name} src={item.src} key={idx} />
        ))}
        {/* {showModal && NestedModal} */}
        <button>친구요청</button>
      </S.Container>
    </Drawer>
  );
};

export default FriendContainer;
