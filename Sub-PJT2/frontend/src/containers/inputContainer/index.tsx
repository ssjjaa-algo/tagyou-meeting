import InputModal from "components/modal/inputModal";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { TokenValue } from "../../atoms/atoms";
import { useRecoilState } from "recoil";

const InputContainer = () => {
  const cookies = new Cookies();
  const [token, setToken] = useRecoilState(TokenValue);
  const [isFirst, setIsFirst] = useState<Boolean>(false);

  const movePage = () => {
    window.location.href = "/home";
  };

  useEffect(() => {
    setToken(cookies.get("Auth"));
  }, [cookies.get("Auth")]);

  useEffect(() => {
    const fetchFirst = async () => {
      fetch("http://localhost:9999/api/users/first", {
        headers: {
          Auth: token,
        },
      }).then((data) => {
        console.log("data", data);
        console.log("data.status", data.status);
        console.log("typeof(data.status)", typeof data.status);

        if (data.status == 404) {
          console.log("에러뜬다 :휴대폰 번호 없음 : first임", token);
          setIsFirst(true);
        } else {
          console.log("이거는 무조건 실행인가?");
          console.log("에러가 안온다 :휴대폰번호있음: 그냥 지나쳐 ", token);
          movePage();
        }
      });
    };
    token.length > 0 && fetchFirst();
  }, [token]);

  const [showModal, setShowModal] = useState<boolean>(true);
  return (
    <>
      {isFirst === true && showModal && (
        <InputModal setShowModal={setShowModal} />
      )}
    </>
  );
};

export default InputContainer;
