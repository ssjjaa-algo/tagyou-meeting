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


  async function waitAndCheck(
  ) {
    return new Promise<void>((resolve) => {
      console.log(roomInfo.userList.length)
      // if (roomInfo.userList.length < 2) return
      const interval = setInterval(() => {
        if (roomInfo.userList.length === 2) {
          clearInterval(interval);
          resolve();
        } 
        // console.log("waitAndCheck 함수에서 ",roomInfo.roomId)
        // const response = await fetch(`${process.env.REACT_APP_BASE_URL}/rooms/one/${roomInfo.roomId}`, {
        //   method: "POST",
        //   headers: {
        //     Auth: token,
        //     "Content-Type": "application/json",
        //   },
        // });
        
        // const res = await response.json();
        
        // if (res['roomId'] !== undefined) {
        //   let updatedRoomInfo = {
        //     roomId: res['roomId'],
        //     roomType: res['roomType'],
        //     sessionId: res['sessionId'],
        //     userList: res['userList']
        //   };
        //   console.log("setRoominfo 이전", updatedRoomInfo);
        //   setRoomInfo(updatedRoomInfo);
        //   console.log("setRoominfo 이후", roomInfo)
          localStorage.setItem('roomInfo', JSON.stringify(roomInfo));
          // setCookie('roomInfo',JSON.stringify(roomInfo), 1)
        // }
      }, 1000); // 1초마다 체크
      // navigate(`/meeting/${roomInfo.roomId}`)
      window.location.href = `/meeting/${roomInfo.roomId}`;
      // clearInterval(interval);
      // resolve();
    })
  }

  useEffect(() => {
    roomInfo.roomId !== 0 && waitAndCheck();
  },[roomInfo])

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
      "roomId": res['roomId'],
      "roomType": res['roomType'],
      "sessionId": res['sessionId'],
      "userList": res['userList']
    })
    waitAndCheck();
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