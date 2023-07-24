interface OtherUserProp {
  otherUser: UserData;
}

interface MessagesProp {
  messages: Array<Message>;
}

interface UserProp {
  user: UserData;
}

const chatRoom = (
  { otherUser }: OtherUserProp,
  { messages }: MessagesProp,
  { user }: UserProp
) => {
  return <div></div>;
};

export default chatRoom;
