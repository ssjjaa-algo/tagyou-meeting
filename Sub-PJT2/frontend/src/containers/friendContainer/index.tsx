import { IsOpen, TokenValue } from "atoms/atoms";
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
  const [token, setToken] = useRecoilState(TokenValue);
  const style: React.CSSProperties = {
    backgroundColor: theme.bg.deep,
  };

  useEffect(() => {
    token !== "" && console.log("left_container에서 확인한 recoilToken", token);
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("친구목록에서 token확인", token);
      fetch("http://localhost:9999/api/friends/list", {
        headers: {
          Auth: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setFriendList(data);
          setLoading(false);
        });
    };
    token && fetchData();
  }, [token]);

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
          <Friend
            friendShipStatus={item.friendShipStatus}
            targetId={item.targetId}
            targetName={item.targetName}
            targetImg={item.targetImg}
            key={idx}
          />
        ))}
        {/* {showModal && NestedModal} */}
        <button>친구요청</button>
      </S.Container>
    </Drawer>
  );
};

export default FriendContainer;
