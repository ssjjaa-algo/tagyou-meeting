import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import * as S from "./ChatList.styled";
import "css/chat/chatList.css";

interface Listprop {
  userData: Array<UserData>;
}

const RightContainer = ({ userData }: Listprop) => {
  const theme: themeProps = useTheme();

  return (
    <S.Container>
      <S.ChatList theme={theme}>
        <S.ChatListBody className="chatList-body">
          {userData?.map((item: UserData, idx: number) => (
            <S.Chat key={idx}>
              {/* <img src="" alt="" /> */}
              <S.ChatProfileImage>{item.profileImage}</S.ChatProfileImage>
              <S.chatContent>
                <S.ChatContentUserData>
                  <div className="chat-content-userData-nameAndAge">
                    {item.name} | {item.age}
                  </div>
                  <div className="chat-content-userData-region">
                    {item.region}
                  </div>
                </S.ChatContentUserData>
                <S.ChatContentMessage>
                  <div className="chat-content-message-content">
                    {item.lastMessage}
                  </div>
                  <S.ChatContentMessageTime>
                    {item.lastMessageTime}
                  </S.ChatContentMessageTime>
                </S.ChatContentMessage>
              </S.chatContent>
            </S.Chat>
          ))}
        </S.ChatListBody>
      </S.ChatList>
    </S.Container>
  );
};

export default RightContainer;
