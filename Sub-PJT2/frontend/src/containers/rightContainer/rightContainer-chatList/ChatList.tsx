import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import * as S from "./ChatList.styled";
import "css/chat/chatList.css";
import { testUserData } from "types/types";

interface Listprop {
  testUserData: Array<testUserData>;
}

const RightContainer = ({ testUserData }: Listprop) => {
  const theme: themeProps = useTheme();

  return (
    <S.Container>
      <S.ChatList theme={theme}>
        <S.ChatListBody className="chatList-body">
          {testUserData?.map((item: testUserData, idx: number) => (
            <S.Chat key={idx} theme={theme}>
              {/* <img src="" alt="" /> */}
              {/* <S.ChatProfileImage>{item.profileImage}</S.ChatProfileImage> */}
              <S.chatContent theme={theme}>
                <S.ChatContentUserData>
                  <div className="chat-content-userData-nameAndAge">
                    {item.name} | {item.age}
                  </div>
                  <div className="chat-content-userData-region">
                    {/* {item.region} */}
                  </div>
                </S.ChatContentUserData>
                <S.ChatContentMessage>
                  <div className="chat-content-message-content">
                    {/* {item.lastMessage} */}
                  </div>
                  <S.ChatContentMessageTime>
                    {/* {item.lastMessageTime} */}
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
