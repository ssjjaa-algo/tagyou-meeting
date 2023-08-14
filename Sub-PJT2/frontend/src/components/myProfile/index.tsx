import * as S from "./myprofile.styled";
import { useRecoilState } from "recoil";
import { TokenValue } from "atoms/atoms";
import { Card } from "antd";

export const MyProfile = () => {
  const [token, setToken] = useRecoilState(TokenValue);

  return (
    <>
      <Card />
    </>
  );
};
