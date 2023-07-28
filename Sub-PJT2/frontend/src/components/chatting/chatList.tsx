// import { useEffect, useState } from "react";
import "css/chat/chatList.css";
import { UserData } from "types/types";

interface Listprop {
  userData: Array<UserData>;
}

const chatList = ({ userData }: Listprop) => {
  // const [data, setData] = useState<Array<Data>>();

  // useEffect(() => {
  //   setData(dataList);
  // }, [dataList]);

  return (
    <div className="chatList">
      <div className="chatList-body">
        {userData?.map((item: UserData, idx: number) => (
          <div className="chat" key={idx}>
            {/* <img src="" alt="" /> */}
            <div className="chat-profileImage">{item.profileImage}</div>
            <div className="chat-content">
              <div className="chat-content-userData">
                <div className="chat-content-userData-nameAndAge">
                  {item.name} | {item.age}
                </div>
                <div className="chat-content-userData-region">
                  {item.region}
                </div>
              </div>
              <div className="chat-content-message">
                <div className="chat-content-message-content">
                  {item.lastMessage}
                </div>
                <div className="chat-content-message-time">
                  {item.lastMessageTime}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default chatList;
