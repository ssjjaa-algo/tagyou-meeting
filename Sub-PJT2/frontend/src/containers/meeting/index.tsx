import RightContainer from "containers/rightContainer/rightConatiner-inGameChat/InGameChat";
import * as S from "./Meeting.styled";
import CatchMind from "containers/inGame/catchMind";
import SonByeonHo from "containers/inGame/sonByeongHo";
import Sis from "containers/inGame/sis";
import { useEffect, useState } from "react";
import Header from "components/header/Header";
import { GameStart as GameStartAtom, UserInfo } from "atoms/atoms";
import { useRecoilState } from "recoil";
import { RoomInfo, InGameChatStatus } from "atoms/atoms";
import { useRecoilValue } from "recoil";

// OpenVidu
import { OpenVidu, Publisher, Session, StreamManager, Subscriber } from 'openvidu-browser';
import axios from 'axios';
import UserVideoComponent from './UserVideoComponent';
import { storiesOf } from "@storybook/react";

const OPENVIDU_SERVER_URL = 'https://tagyou.site:8443';
const OPENVIDU_SERVER_SECRET = 'tagyou';

const Meeting = () => {
  const [GameStart, setGameStart] = useRecoilState(GameStartAtom);
  const [selectedGame, setSelectedGame] = useState("");
  const [inGameChatStatus, setInGameChatStatus] = useRecoilState(InGameChatStatus);
  const userInfo = useRecoilValue(UserInfo);
  const [roomInfo, setRoomInfo] = useRecoilState(RoomInfo); // 추가
  const [myUserName, setMyUserName] = useState(userInfo.userName);
  const [session, setSession] = useState<Session | null>();
  const [mainStreamManager, setMainStreamManager] = useState<StreamManager | null>(null);
  const [publisher, setPublisher] = useState<Publisher | undefined>(undefined)
  // const [subscriber, setSubscriber] = useState<Subscriber | undefined>(undefined)
  const [publishers, setPublishers] = useState<any[]>([]); // 추가

  // const [subscribers, setSubscribers] = useState<any[]>([]);
  // const [device, setDevice] = useState<Device | undefined>(undefined)

  useEffect(() => {
    const storedRoomInfo = localStorage.getItem('roomInfo');
    if (storedRoomInfo) {
      const parsedRoomInfo = JSON.parse(storedRoomInfo);
      setRoomInfo(parsedRoomInfo);
      joinSession(parsedRoomInfo);
    }

    const rightContainer = document.querySelector(
      ".right_container"
    ) as HTMLElement;
    if (rightContainer instanceof Element) {
      rightContainer.style.width = "100vw";
    }
  }, []);

  const renderSelectedGame = () => {
    if (selectedGame === "catchMind") {
      return <CatchMind publisher={publisher} />;
    } else if (selectedGame === "sonByeonHo") {
      return <SonByeonHo />;
    } else if (selectedGame === "sis") {
      return <Sis />;
    }
  };

  const leaveSession = () => {
    if (session) {
        session.disconnect();
    }
  }
  
  // Openvidu
  const joinSession = (roomInfo: any) => {
    const OV = new OpenVidu();
    let mySession: Session = OV.initSession()

    mySession.on("streamCreated", function (event) {
      mySession.subscribe(event.stream, "subscriber");
    });
    
    new Promise((resolve, reject) => {
      let data = {};
      axios
        .post(
            `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${roomInfo.sessionId}/connection`,
            data,
            {
            headers: {
                Authorization: `Basic ${btoa(
                `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
                )}`,
                'Content-Type': 'application/json',
            },
            }
        )
        .then((response) => {
          const token = response.data.token
          mySession.connect(token)
          .then(() => {
            let publisher = OV.initPublisher("publisher");
            mySession.publish(publisher);
            setPublisher(publisher);
          })
        })
          .catch((error) => console.log(error));
        });
  };

  return (
    
    <S.Container
    className={!inGameChatStatus ? "Container-Son" : "Container-Son-withChat"}
    >
      <Header />
      {!GameStart ? (
        <S.Container
        className={!inGameChatStatus ? "Container-Son" : "Container-Son-withChat"}
        >
          <S.InnerContainer>
              { roomInfo.roomType === "One" ? (
                <S.PlayerVidBundle>
                  <S.PlayerVid>{publisher !== undefined ? (<UserVideoComponent streamManager={publisher} />): null}</S.PlayerVid>
                </S.PlayerVidBundle>
              ) : (
                <S.PlayerVidBundle>
                  <S.PlayerVid>{publisher !== undefined ? (<UserVideoComponent streamManager={publisher} />): null}</S.PlayerVid>
                  <S.PlayerVid>{publisher !== undefined ? (<UserVideoComponent streamManager={publisher} />): null}</S.PlayerVid>
                  <S.PlayerVid>{publisher !== undefined ? (<UserVideoComponent streamManager={publisher} />): null}</S.PlayerVid>
                </S.PlayerVidBundle>
              )
              }
            <S.Middle>
              <select
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
              >
                <option value="">게임을 선택하세요</option>
                <option value={"catchMind"}>캐치마인드</option>
                <option value={"sonByeonHo"}>손병호게임</option>
                <option value={"sis"}>고요속의 외침</option>
              </select>
              <button onClick={() => setGameStart(true)}>게임 시작</button>
            </S.Middle>
              { roomInfo.roomType === "One" ? (
                <S.PlayerVidBundle>
                  <S.PlayerVid>{publisher !== undefined ? (<UserVideoComponent id="subscriber" />): null}</S.PlayerVid>
                </S.PlayerVidBundle>
              ) : (
                <S.PlayerVidBundle>
                  <S.PlayerVid>{publisher !== undefined ? (<UserVideoComponent id="subscriber" />): null}</S.PlayerVid>
                  <S.PlayerVid>{publisher !== undefined ? (<UserVideoComponent id="subscriber" />): null}</S.PlayerVid>
                  <S.PlayerVid>{publisher !== undefined ? (<UserVideoComponent id="subscriber" />): null}</S.PlayerVid>
                </S.PlayerVidBundle>
              )
              }
          </S.InnerContainer>
        </S.Container>
      ) : (
        renderSelectedGame()
      )}
      <RightContainer />
    </S.Container>
  );
};

export default Meeting;


