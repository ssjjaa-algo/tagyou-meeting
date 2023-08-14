import { IsDark, IsOpen, TokenValue } from "atoms/atoms";
import Friend from "components/friend";
import Drawer from "react-modern-drawer";
import { useRecoilState, useRecoilValue } from "recoil";
import * as S from "./friendContainer.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { friendProps } from "types/types";
import { FriendSearchModal } from "components/modal/friendSearchModal";
import { Button } from "antd";
const FriendContainer = () => {
  const theme = useTheme<themeProps>();
  const [isOpen, setIsOpen] = useRecoilState(IsOpen);
  const [friendList, setFriendList] = useState<friendProps[]>();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useRecoilState(TokenValue);
  const [showModal, setShowModal] = useState<boolean>();
  const isDark = useRecoilValue(IsDark);

  const style: React.CSSProperties = {
    backgroundColor: theme.bg.deep,
  };

  const ButtonStyles: React.CSSProperties = {
    backgroundColor: isDark ? "#4d4d4c" : "#f65b76",
    color: theme.font.light,
    border: "none",
    width: "220px",
    marginTop: "10px",
  };

  useEffect(() => {
    token !== "" && console.log("left_container에서 확인한 recoilToken", token);
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("친구목록에서 token확인", token);
      fetch(`${process.env.REACT_APP_BASE_URL}/friends/list`, {
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
    <>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        overlayOpacity={0}
        style={style}
      >
        <S.Container>
          <S.SubTitle theme={theme}>친구목록</S.SubTitle>
          <S.FriendContainer>
            <Friend
              friendShipStatus={"FRIEND"}
              targetId={1}
              targetName={"홍재연"}
              targetImg={"sss"}
              key={1}
            />
            <Friend
              friendShipStatus={"FRIEND"}
              targetId={1}
              targetName={"홍재연"}
              targetImg={"sss"}
              key={1}
            />
            <Friend
              friendShipStatus={"FRIEND"}
              targetId={1}
              targetName={"홍재연"}
              targetImg={"sss"}
              key={1}
            />
            <Friend
              friendShipStatus={"FRIEND"}
              targetId={1}
              targetName={"홍재연"}
              targetImg={"sss"}
              key={1}
            />
            {friendList?.map((item: friendProps, idx: number) => (
              <Friend
                friendShipStatus={item.friendShipStatus}
                targetId={item.targetId}
                targetName={item.targetName}
                targetImg={item.targetImg}
                key={idx}
              />
            ))}

            {/* <S.NullMessageBox>
              <S.NullMessage theme={theme}> 친구가 없어요 </S.NullMessage>
            </S.NullMessageBox> */}
          </S.FriendContainer>

          <S.SubTitle theme={theme}>
            대기된 친구 <S.StyledBadge theme={theme} count={40} />
            <S.Des theme={theme}>친구 신청을 대기중이에요 😶</S.Des>
          </S.SubTitle>
          <S.OtherFriendContainer>
            <S.NullMessageBox>
              <S.SpecialNullMessage theme={theme}>
                대기된 친구가 없어요
              </S.SpecialNullMessage>
            </S.NullMessageBox>
          </S.OtherFriendContainer>

          <S.SubTitle theme={theme}>
            요청온 친구 <S.StyledBadge theme={theme} count={20} />
          </S.SubTitle>
          <S.Des theme={theme}>친구 요청이 들어왔어요 🤩</S.Des>
          <S.OtherFriendContainer>
            <Friend
              friendShipStatus={"RECEIVED"}
              targetId={1}
              targetName={"홍재연"}
              targetImg={"sss"}
              key={1}
            />
            {/* <S.NullMessageBox>
              <S.SpecialNullMessage theme={theme}>
                요청온 친구가 없어요
              </S.SpecialNullMessage>
            </S.NullMessageBox> */}
          </S.OtherFriendContainer>

          <S.SubTitle theme={theme}>친구찾기</S.SubTitle>
          <S.SpecialDes theme={theme}>
            이름으로 친구를 검색해봐요 👽
          </S.SpecialDes>

          <Button style={ButtonStyles} onClick={() => setShowModal(true)}>
            친구 검색
          </Button>
        </S.Container>
      </Drawer>
      {showModal && <FriendSearchModal setShowModal={setShowModal} />}
    </>
  );
};

export default FriendContainer;
