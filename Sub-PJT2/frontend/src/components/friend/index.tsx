import { friendProps } from "types/types";

const Friend = ({ id, name, src }: friendProps) => {
  return (
    <div>
      <img src={src} alt="profile"></img>
      <span>{id}</span>
      <span>{name}</span>
    </div>
  );
};

export default Friend;
