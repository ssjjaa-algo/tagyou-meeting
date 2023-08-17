import { GroupResDto, TokenValue } from "atoms/atoms";
import * as S from "./Button.styled";
import { useRecoilState, useRecoilValue } from "recoil";

type stateType = "default" | "make" | "view";
type btnProps = {
  content: string;
  source: "make" | "view";
  setShowState: (value: stateType) => void;
};

const RoomBtn = ({ source, content, setShowState }: btnProps) => {
  const token = useRecoilValue(TokenValue);
  const [groupInfo, setGroupInfo] = useRecoilState(GroupResDto);
  const creatRoom = () => {
    console.log("!!!!!, creatRoom 토큰 확인", token);
    console.log(
      "fetch 주소",
      `${process.env.REACT_APP_BASE_URL}/groups/create`
    );
    fetch(`${process.env.REACT_APP_BASE_URL}/groups/create`, {
      headers: {
        Auth: token,
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((res) => setGroupInfo(res));
  };

  const handleOnClick = (source: "default" | "make" | "view") => {
    setShowState(source);
    if (source === "make") {
      creatRoom();
    } else {
    }
  };

  return (
    <div>
      <S.Button onClick={() => handleOnClick(source)}>{content}</S.Button>
    </div>
  );
};

export default RoomBtn;
