import InputModal from "components/modal/inputModal";
import * as S from "./index.styled";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { TokenValue } from "../../atoms/atoms";
import { useRecoilState } from "recoil";

const InputContainer = () => {
  const cookies = new Cookies();
  const [token, setToken] = useRecoilState(TokenValue);
  const [isFirst, setIsFirst] = useState<Boolean>(true);

  // useEffect(() => {
  //   const fetchSido = async () => {
  //     fetch("http://localhost:9999/api/areas", {
  //       headers: {
  //         Auth: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE2OTE3MTM0OTgsImV4cCI6MTY5MTc3MzQ5OH0.Yj8SUS1EJ5Z3YQ5Ywf77_LXe-sQ3mLJf7hEhBJgI_WA",
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((res) => {
  //         console.log(res);
  //       });
  //   };
  //   setToken(cookies.get("Auth"));
  //   fetchSido();
  // }, []);
  const movePage = () => {
    window.location.href = "/home";
  };

  useEffect(() => {
    console.log("쿠키가 바뀌었어요!!!!!!!!!!!!!!!!!!!!!");
    const fetchFirst = async () => {
      fetch("http://localhost:9999/api/users/first", {
        headers: {
          Auth: token,
        },
      })
        .then((data) => {
          console.log("휴대폰 번호가 없어서 처음이라고 판정", data); // Check the data received from the server
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setIsFirst(false);
          // movePage();
        });
    };

    setToken(cookies.get("Auth"));
    fetchFirst();
  }, []);

  const [showModal, setShowModal] = useState<boolean>(true);
  return (
    <>
      {isFirst === true && showModal && (
        <InputModal setShowModal={setShowModal} />
      )}
      {isFirst === false && <div>처음이 아니라서 input받을 필요가 없어요 </div>}
    </>
  );
};

export default InputContainer;
