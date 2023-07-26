type UserData = {
  profileImage: string;
  name: string;
  region: string;
  lastMessage: string;
  lastMessageTime: string;
  age: int;
  mbti: string;
};

type Message = {
  from: string;
  to: string;
  content: string;
  time: string;
};

type ChatData = {
  otherUser: UserData;
  messages: Array<Message>;
  user: UserData;
};
