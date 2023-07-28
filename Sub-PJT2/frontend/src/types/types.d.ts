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

export type ChatData = {
  otherUser: UserData;
  messages: Array<Message>;
  user: UserData;
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
  mbti: string;
  job: string;
  hobby: string;
  like: number;
};