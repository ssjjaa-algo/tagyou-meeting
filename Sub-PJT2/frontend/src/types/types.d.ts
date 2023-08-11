// user, profile 테이블 join 예정 -- 아래 type은 임시로 작성한 것임
export type userProps = {
  userEmail: string;
  userName: string;
  phoneNumber: number;
  userAge: number;
  userGender: "FEMALE" | "MALE";
  userLike: number;
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

export type UserData = {
  // users 테이블
  // userId: BigInt;
  // createdDate: Date;
  // lastUsedDate: Date;
  phoneNumber: string;
  // roleType: string;
  userAge: Int;
  userEmail: string;
  userGender: string;
  userLike: Int;
  userName: string;
  // userImageId: BigInt;
  // groupId: BigInt;
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

export type ProfileData = {
  // profile 테이블
  // userProfileId: BigInt;
  // createdDate: Date;
  // lastUsedDate: Date;
  userSido: string;
  userGugun: string;
  userJob: string;
  userHobby: string;
  userMbti: string;
  content: string;
  // userId: BigInt;
};

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
  id: string;
  name: string;
  src: string;
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
