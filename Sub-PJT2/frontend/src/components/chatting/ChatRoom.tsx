import "css/chat/chatRoom.css";
import React, { useRef } from "react";
import sendButton from "stats/img/button_send.png";
import { ChatData } from "types/types";
import { useState, useEffect } from "react";

interface chatDataProps {
  chatData: ChatData;
}

const ChatRoom = () => {
  const [chatList, setChatList] = useState<chatDataProps>();

  useEffect(() => {
    const fetchData = async () => {
      fetch("chatlist").then((res) =>
        res.json().then((data) => setChatList(data))
      );
    };
    fetchData();
    console.log(chatList);
  }, []);

  return (
    <div>
      <span>chattingRoom</span>
    </div>
  );

  // const chats = () => {
  //   const result = [];
  //   const chats = chatData.messages;
  //   const user = chatData.user;
  //   result.push(
  //     <div className="chatbegins">
  //       <div className="line"></div>
  //       <div>대화의 시작</div>
  //       <div className="line"></div>
  //     </div>
  //   );

  //   for (let i = 0; i < chats.length; i++) {
  //     if (chats[i].from !== user.name) {
  //       result.push(
  //         <div className="messageReceived">
  //           <div className="messageBox">
  //             <div className="message-content">{chats[i].content}</div>
  //             <div className="message-time">{chats[i].time}</div>
  //           </div>
  //         </div>
  //       );
  //     } else {
  //       result.push(
  //         <div className="messageSent">
  //           <div className="messageBox">
  //             <div className="message-time">{chats[i].time}</div>
  //             <div className="message-content">{chats[i].content}</div>
  //           </div>
  //         </div>
  //       );
  //     }
  //   }
  //   return result;
  // };

  // const bottomRef = useRef<HTMLDivElement>(null);
  // window.addEventListener("DOMContentLoaded", function () {
  //   bottomRef.current?.scrollIntoView();
  // });

  // return (
  //   <div className="chatRoom">
  //     <div className="chatRoom-body">
  //       <div className="chatRoom-couterpart">
  //         <div className="couterpart-info">
  //           {/* <img src="" alt="" /> */}
  //           {/* 여기 img 들어가면 바로 아래 div 빼고 couterpart-exceptImg div 수정해야됨 */}
  //           <div className="couterpart-img">
  //             {chatData.otherUser.profileImage}
  //           </div>
  //           <div className="couterpart-exceptImg">
  //             <div>
  //               {chatData.otherUser.name} | {chatData.otherUser.age}
  //             </div>
  //             <div>{chatData.otherUser.region}</div>
  //             <div>{chatData.otherUser.mbti}</div>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="chatRoom-main">
  //         <div className="chatRoom-main-box">
  //           <div className="chatRoom-main-chats">
  //             <div className="chatRoom-main-chats-content">{chats()}</div>
  //             <div ref={bottomRef}></div>
  //           </div>
  //           <div className="chatRoom-main-input">
  //             <textarea />
  //             <button>
  //               <img src={sendButton} alt="send" />
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="chatRoom-user">
  //         <div className="user-info">
  //           <div className="user-img">{chatData.user.profileImage}</div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default ChatRoom;
