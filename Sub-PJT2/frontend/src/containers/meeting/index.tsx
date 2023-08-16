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
import { OpenVidu, Publisher, Session, StreamManager } from 'openvidu-browser';
import axios from 'axios';
import UserVideoComponent from './UserVideoComponent';
import userEvent from "@testing-library/user-event";

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
  const [publishers, setPublishers] = useState<any[]>([]); // 추가

  // const [subscribers, setSubscribers] = useState<any[]>([]);
  // const [device, setDevice] = useState<Device | undefined>(undefined)

  useEffect(() => {
    const rightContainer = document.querySelector(
      ".right_container"
    ) as HTMLElement;
    if (rightContainer instanceof Element) {
      rightContainer.style.width = "100vw";
    }
    joinSession(); 
  }, []);

  const renderSelectedGame = () => {
    if (selectedGame === "catchMind") {
      return <CatchMind />;
    } else if (selectedGame === "sonByeonHo") {
      return <SonByeonHo />;
    } else if (selectedGame === "sis") {
      return <Sis />;
    }
  };

  // Openvidu
  const joinSession = () => {
    // --- 1) Get an OpenVidu object ---
    const OV = new OpenVidu();

    // --- 2) Init a session ---
    let mySession: Session = OV.initSession()
    setSession(mySession)

    mySession.on("streamCreated", function (event) {
      mySession.subscribe(event.stream, "subscriber");
    });

    // --- 3) Specify the actions when events take place in the session ---
    // On every new Stream received...
    // mySession.on('streamCreated', (event) => {
    //     // Subscribe to the Stream to receive it. Second parameter is undefined
    //     // so OpenVidu doesn't create an HTML video by its own
    //     let subscriber = mySession.subscribe(event.stream, undefined);
    //     // Update the state with the new subscribers
    //     subscribers.push(subscriber)
    //     // setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    //   });
        
    // On every Stream destroyed...
    // mySession.on('streamDestroyed', (event) => {
    //   const deleteSubscriber = (streamManagerToDelete: any) => {
    //     // setSubscribers(prevSubscribers => prevSubscribers.filter(subscriber => subscriber !== streamManagerToDelete));
    //   };
    //   deleteSubscriber(mainStreamManager);
    // });

    // --- 4) Connect to the session with a valid user token ---
    // Get a token from the OpenVidu deployment
    getToken(roomInfo.sessionId).then((token: any) => {
      // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
      // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
      mySession
        .connect(token, { clientData: myUserName })
        .then(async () => {
          // --- 5) Get your own camera stream ---
          // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
          // element: we will manage it on our own) and with the desired properties


          if (roomInfo.roomType === "O") {
            let publisher = OV.initPublisher("publisher");
            mySession.publish(publisher);
          } else {
            let publisher = await OV.initPublisherAsync(undefined, {
          audioSource: undefined, // The source of audio. If undefined default microphone
          videoSource: undefined, // The source of video. If undefined default webcam
          publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
          publishVideo: true, // Whether you want to start publishing with your video enabled or not
          resolution: '640x480', // The resolution of your video
          frameRate: 30, // The frame rate of your video
          insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
          mirror: false}) // Whether to mirror your local video or not
          // --- 6) Publish your stream ---
          mySession.publish(publisher);
          }
          console.log(roomInfo)
        })
        .catch(error => {
          console.log("There was an error connecting to the session:", error.code, error.message);
        });
    })


          // Obtain the current video device in use
          // let devices = await OV.getDevices();
          // let videoDevices = devices.filter(device => device.kind === 'videoinput');
          // let currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
          // let currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

          // Set the main video in the page to display our webcam and store our Publisher
          // setDevice(currentVideoDevice)
    //       setMainStreamManager(publisher)
    //       setPublisher(publisher)
    //     })
    //     .catch((error) => {
    //         console.log('There was an error connecting to the session:', error.code, error.message);
    //     });
    // });
  };

  const leaveSession = () => {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    if (session) {
        session.disconnect();
    }
    
    // Empty all properties...
    // setOV(undefined)
    // setSession(null)
    // setSubscribers([])
    // setMainStreamManager(null)
    // setPublisher(undefined)
  }

  const getToken = (mySessionId: any) => {
    return createSession(mySessionId).then((sessionId) =>
      createToken(sessionId)
    );
  }

  // 여기서 sessionId 받기
  const createSession = (sessionId: any) => {
  return new Promise((resolve, reject) => {
    let data = JSON.stringify({ customSessionId: sessionId });
    axios
    .post(`${OPENVIDU_SERVER_URL}/openvidu/api/sessions`, data, {
        headers: {
        Authorization: `Basic ${btoa(
            `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
        )}`,
        'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        resolve(response.data.id);
    })
    .catch((response) => {
        let error = { ...response };
        if (error?.response?.status === 409) {
        resolve(sessionId);
        } else if (
        window.confirm(
            `No connection to OpenVidu Server. This may be a certificate error at "${OPENVIDU_SERVER_URL}"\n\nClick OK to navigate and accept it. ` +
            `If no certificate warning is shown, then check that your OpenVidu Server is up and running at "${OPENVIDU_SERVER_URL}"`
        )
        ) {
        window.location.assign(`${OPENVIDU_SERVER_URL}/accept-certificate`);
        }
    });
  });
  }

  const createToken = (sessionId: any) => {
  return new Promise((resolve, reject) => {
    let data = {};
    axios
      .post(
          `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`,
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
        resolve(response.data.token);
      })
        .catch((error) => reject(error));
      });
    }
  
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
              { roomInfo.roomType === "O" ? (
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
            { roomInfo.roomType === "O" ? (
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


