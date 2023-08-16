import internal from "stream";

export type userProps = {
  userEmail: string;
  userName: string;
  phoneNumber: string;
  userAge: number;
  userGender: "FEMALE" | "MALE";
  userLike: number;
  userStatus: string;
};

export type profileProps = {
  userSido: string;
  userSidoCode: number;
  userGugun: string;
  userJob: string;
  userHobby: string;
  userMbti: string;
  content: string;
};

export type testUserData = {
  profileImage: string;
  name: string;
  region: string;
  lastMessage: string;
  lastMessageTime: string;
  age: number;
  mbti: string;
};

export type roomProps = {
  roomType: string;
  roomId: number;
  sessionId: string;
  userList: string[];
}

export type Message = {
  // meeting_room_message 테이블
  // messageId: BigInt;
  // createdDate: Date;
  // lastUsedDate: Date;
  // content: string;
  // roomId: BigInt;
  // messageFromUserId: BigInt;
  from: string;
  to: string;
  content: string;
  time: string;
};

export type chatProps = {
  from: string;
  content: string;
  to: string;
  time: Date;
};

export type friendProps = {
  friendShipStatus: "REQUESTED" | "BLOCKED" | "FRIEND" | "NONE" | "RECEIVED";
  targetId: number;
  targetName: string;
  targetImageUrl: string;
};

export type leftContainerProprs = {
  imgSrc: string;
  name: string;
  age: number;
};

export type userInfoProps = {
  id: string | null;
  nickname: string | null;
};

export type CanvasProps = {
  width: number;
  height: number;
};
