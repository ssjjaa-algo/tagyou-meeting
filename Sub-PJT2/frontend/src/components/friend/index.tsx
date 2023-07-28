import { friendProps } from "types/types";
import * as S from "./Friend.styled";
import tmpImgSrc from "../../asset/img/imgSrcTest.jpg";

const Friend = ({ id, name, src }: friendProps) => {
  return (
    <S.Container to="/chatroom">
      <div>{src}</div>
      <S.ProfileImgBox>
        <S.ProfileImg src={tmpImgSrc} width={50} height={50} alt="profile" />
      </S.ProfileImgBox>
      <span>{name}</span>
    </S.Container>
  );
};

export default Friend;
