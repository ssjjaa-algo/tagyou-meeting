import InputModal from "components/modal/inputModal";
import * as S from "./index.styled";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { TokenValue } from "../../atoms/atoms";
import { useRecoilState } from "recoil";

const InputContainer = () => {
  const cookies = new Cookies();
  const [Token, setToken] = useRecoilState(TokenValue);
  const [IsFirst, setIsFirst] = useState<Boolean>(true);

  useEffect(() => {
    const fetchFirst = async () => {
      fetch("http://localhost:9999/api/users/first", {
        headers: {
          Auth: Token,
        },
      })
        .then((res) => res.json()) // Parse the response as JSON
        .then((data) => {
          console.log(data); // Check the data received from the server
          data.firstLogin === true ? setIsFirst(true) : setIsFirst(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    setToken(cookies.get("Auth"));
    fetchFirst();
  }, [cookies]);

  // useEffect(() => {
  //   const fetchFirst = async () => {
  //     fetch("http://localhost:9999/api/users/first", {
  //       headers: {
  //         Auth: Token,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((res) => {
  //         console.log(res);
  //         // console.log(JSON.parse(res.body));
  //         // res.firstLogin === true ? setIsFirst(true) : setIsFirst(false);
  //       });
  //   };
  //   setToken(cookies.get("Auth"));
  //   fetchFirst();
  //   console.log("token", Token);
  // }, [cookies]);

  const [showModal, setShowModal] = useState<boolean>(true);
  return (
    <>
      {IsFirst
        ? showModal && <InputModal setShowModal={setShowModal} />
        : (window.window.location.href = "/home")}
    </>
  );
};

export default InputContainer;
