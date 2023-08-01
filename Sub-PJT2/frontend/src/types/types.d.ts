export type UserData = {
  profileImage: string;
  name: string;
  region: string;
  lastMessage: string;
  lastMessageTime: string;
  age: int;
  mbti: string;
};

export type Message = {
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

export type getProfileProps = {
  imgSrc: string;
  name: string;
  age: number;
  email: string;
  mbti: string;
  job: string;
  hobby: string;
  like: number;
  region_sido: string;
  region_sigungu: string;
};

export type userInfoProps = {
  id: string | null;
  nickname: string | null;
};

export type CanvasProps = {
  width: number;
  height: number;
};