import { GroupResDto, InvitedList, TokenValue } from "atoms/atoms";
import * as S from "./Button.styled";
import { useRecoilValue, useSetRecoilState } from "recoil";

type stateType = "default" | "make" | "view";
type btnProps = {
  content: string;
  source: "make" | "view";
  setShowState: (value: stateType) => void;
};

const RoomBtn = ({ source, content, setShowState }: btnProps) => {
  const token = useRecoilValue(TokenValue);
  const setGroupInfo = useSetRecoilState(GroupResDto);
  const setInvitedList = useSetRecoilState(InvitedList);

  const createGroup = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/groups/create`, {
      headers: {
        Auth: token,
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((res) => setGroupInfo(res));
  };

  const getInvitedList = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/groups/list`, {
      headers: {
        Auth: token,
      },
    })
      .then((response) => response.json())
      .then((res) => setInvitedList((pre) => [...pre, res]));
  };

  const handleOnClick = (source: "default" | "make" | "view") => {
    setShowState(source);
    if (source === "make") {
      createGroup();
    } else {
      getInvitedList();
    }
  };

  return (
    <div>
      <S.Button onClick={() => handleOnClick(source)}>{content}</S.Button>
    </div>
  );
};

export default RoomBtn;
