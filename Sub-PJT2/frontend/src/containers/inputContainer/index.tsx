import InputModal from "components/modal/inputModal";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { TokenValue } from "../../atoms/atoms";
import { useRecoilState } from "recoil";
import axios from "axios";

const InputContainer = () => {
  const cookies = new Cookies();
  const [token, setToken] = useRecoilState(TokenValue);
  const [isFirst, setIsFirst] = useState<Boolean>(true);

  const movePage = () => {
    window.location.href = "/home";
  };

  useEffect(() => {
    setToken(cookies.get("Auth"));
  }, [cookies.get("Auth")]);

  useEffect(() => {
    const fetchFirst = async () => {
      try {
        const response = await axios.get("http://localhost:9999/api/users/first", {
          headers: {
            Auth: token,
          },
        });

        console.log("response", response);
        console.log("response.status", response.status);
        console.log("typeof(response.status)", typeof response.status);

        if (response.status === 404) {
          console.log("에러뜬다 :휴대폰 번호 없음 : first임", token);
          setIsFirst(true);
        } else {
          console.log("이거는 무조건 실행인가?");
          console.log("에러가 안온다 :휴대폰번호있음: 그냥 지나쳐 ", token);
          // movePage();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
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
