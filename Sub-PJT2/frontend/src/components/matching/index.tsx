import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import * as S from "./matching.styled";
import './index.css'
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { RoomInfo, TokenValue } from "atoms/atoms";
import { Cookies } from "react-cookie";
import { Userlist } from "components/userList";
import { userInfo } from "os";
import { async } from "q";
import { useNavigate } from "react-router";
import { recoilPersist } from 'recoil-persist';
import { update } from "@react-spring/web";


const Matching = ({
  setShowMatching
}:{setShowMatching: (value: boolean) => void}) => {
  const handleCloseMatching = () => {
    setShowMatching(false);
  };
  const theme: themeProps = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useRecoilState(TokenValue);
  const [roomInfo, setRoomInfo] = useRecoilState(RoomInfo);

  // const navigate = useNavigate();

//   let setCookie = function(roomInfo: string, value: any, exp: number) {
//     var date = new Date();
//     date.setTime(date.getTime() + exp*60*1000);
//     document.cookie = roomInfo + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
// };


function waitAndCheck () {
      console.log("2명이 모였는가?", roomInfo.userList.length)
      // if (roomInfo.userList.length < 2) return
      
      
      setInterval(() => {
        // handleFirstClick()
        console.log("interval 확인")
        console.log("인원 체크:", roomInfo.userList.length)
        if (roomInfo.userList.length === 2) {
          console.log("waitAndCheck 함수에서 ",roomInfo.roomId)
          fetch(`${process.env.REACT_APP_BASE_URL}/rooms/one/${roomInfo.roomId}`, {
            method: "POST",
            headers: {
              Auth: token,
              "Content-Type": "application/json",
            },
          })
          .then((res) => res.json())
          .then((res)=> {
            // console.log("if문 진입 직전,", res)
            if (res['userList']) {
              // console.log("if문 들어옴", res)
              setRoomInfo({
                roomId: res['roomId'],
                roomType: res['roomType'],
                sessionId: res['sessionId'],
                userList: res['userList']
              });
              // roomInfo 정보가 무조건 바껴야한다.
              
              console.log("roomInfo가 바꼈나?",roomInfo)
            
            } 
          })
          .catch((res) => console.log(res))
        } else {
          fetch(`${process.env.REACT_APP_BASE_URL}/rooms/one/${roomInfo.roomId}`, {
            method: "GET",
            headers: {
              Auth: token,
            },
          }).then((res) => res.json())
          .then((res) => {
            console.log("변경 이전:", roomInfo)
            setRoomInfo({
              roomId: res['roomId'],
              roomType: res['roomType'],
              sessionId: res['sessionId'],
              userList: res['userList']
            })
            console.log("변경 이후:", roomInfo)
          })
        } 
      }, 5000); // 1초마다 체크
  }

  useEffect(() => {
    roomInfo.roomId != 0 && waitAndCheck();
  },[roomInfo])

  useEffect(() => {
    console.log("useEffect 들어옴", roomInfo)

    if (roomInfo.sessionId) {
      console.log("useEffect 안의 if문 진입")
      window.location.href = `/meeting/${roomInfo.roomId}`;
    }
  },[roomInfo.sessionId])




  const handleFirstClick = () => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_BASE_URL}/rooms/one`, {
      method: "POST",
      headers: {
        Auth: token,
        "Content-Type": "application/json",
      },
    }).then((response)=> response.json())
    .then((res)=>{
      setRoomInfo({          
        ...roomInfo,
      "roomId": res['roomId'],
      "roomType": res['roomType'],
      // "sessionId": res['sessionId'],
      "userList": res['userList'],
    })
    console.log("handleFirstClick", roomInfo)
  })
}
  

  const handleSecondClick = async () => {
    setIsLoading(true);
  };

  return (
    <S.ModalWrapper onClick={handleCloseMatching}>
      <S.ModalContent onClick={(e) => e.stopPropagation()} theme={theme}>
        <S.CloseIconStyled onClick={handleCloseMatching} />
        <S.ButtonContainer>
          {isLoading ? (
            <>
              <div className="lds-heart"><div></div></div>
              <S.Loading theme={theme}>로딩 중...</S.Loading>
            </>
          ) : (
            <>
              <S.Button theme={theme} onClick={handleFirstClick}>
                일대일 매칭
              </S.Button>
              <S.Button theme={theme} onClick={handleSecondClick}>
                다대다 매칭
              </S.Button>
            </>
          )}
        </S.ButtonContainer>
      </S.ModalContent>
    </S.ModalWrapper>
  // const handleSecondClick = () => {
  //   // setIsLoading(true);
  //   console.log("hhello");
  //   setShowModal(true);
  //   //자식에게까지 상속되는 것 같다
  //   // setShowMatching(false);
  //   console.log("이건 되남");
  // };

  // useEffect(() => {
  //   console.log("showmodal", showModal);
  // }, [showModal]);

  // return (
  //   <>
  //     <S.ModalWrapper onClick={handleCloseMatching}>
  //       <S.ModalContent onClick={(e) => e.stopPropagation()} theme={theme}>
  //         <S.CloseIconStyled onClick={handleCloseMatching} />
  //         <S.ButtonContainer>
  //           {isLoading ? (
  //             <>
  //               <div className="lds-heart">
  //                 <div></div>
  //               </div>
  //               <S.Loading theme={theme}>로딩 중...</S.Loading>
  //             </>
  //           ) : (
  //             <>
  //               <S.Button theme={theme} onClick={handleFirstClick}>
  //                 일대일 매칭
  //               </S.Button>
  //               <S.Button theme={theme} onClick={handleSecondClick}>
  //                 다대다 매칭
  //               </S.Button>
  //             </>
  //           )}
  //           {showModal && <GroupModal setShowModal={setShowModal} />}
  //         </S.ButtonContainer>
  //       </S.ModalContent>
  //     </S.ModalWrapper>
  //   </>
  )
  };

export default Matching;