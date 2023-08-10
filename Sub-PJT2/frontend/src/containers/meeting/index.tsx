import RightContainer from "containers/rightContainer/rightConatiner-inGameChat/InGameChat";
import * as S from "./Meeting.styled";
import CatchMind from "containers/inGame/catchMind";
import SonByeonHo from "containers/inGame/sonByeongHo";
import Sis from "containers/inGame/sis";
import { useEffect, useState } from "react";
import Header from "components/header/Header";
import { GameStart as GameStartAtom } from "atoms/atoms";
import { useRecoilState } from "recoil";
import { InGameChatStatus } from "atoms/atoms";
// OpenVidu
import { OpenVidu } from 'openvidu-browser';
import { Session } from 'openvidu-browser';
import { Subscriber } from 'openvidu-browser';
import { StreamManager } from 'openvidu-browser';
import { Publisher } from 'openvidu-browser';
import { Device } from 'openvidu-browser';
import axios from 'axios';
import UserVideoComponent from './UserVideoComponent';

const OPENVIDU_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'https://tagyou.site:8443';
const OPENVIDU_SERVER_SECRET = 'tagyou';

const Meeting = () => {
  // const [GameStart, setGameStart] = useRecoilState(GameStartAtom);
  // const [selectedGame, setSelectedGame] = useState("");
  // const [inGameChatStatus, setInGameChatStatus] = useRecoilState(InGameChatStatus);
  // const [mySessionId, setMySessionId] = useState(undefined);
  // const [myUserName, setMyUserName] = useState(undefined);
  // const [OV, setOV] = useState<any>();
  // const [mainStreamManager, setMainStreamManager] = useState<StreamManager | null>(null);
  // const [session, setSession] = useState<Session | undefined>(undefined);
  // const [publisher, setPublisher] = useState<Publisher | undefined>(undefined);
  // const [subscriber, setSubscriber] = useState<Subscriber | undefined>(undefined);
  // const [subscribers, setSubscribers] = useState([]);
  // const [device, setDevice] = useState<Device | undefined>(undefined)
  // const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined);

  // useEffect(() => {
  //   const rightContainer = document.querySelector(
  //     ".right_container"
  //   ) as HTMLElement;
  //   if (rightContainer instanceof Element) {
  //     rightContainer.style.width = "100vw";
  //   }
  // }, []);

  // const renderSelectedGame = () => {
  //   if (selectedGame === "catchMind") {
  //     return <CatchMind />;
  //   } else if (selectedGame === "sonByeonHo") {
  //     return <SonByeonHo />;
  //   } else if (selectedGame === "sis") {
  //     return <Sis />;
  //   }
  // };

  // // Openvidu
  // const joinSession = () => {
  //   // --- 1) Get an OpenVidu object ---
  //   const OV = new OpenVidu();
  //   setOV(OV)
    
  //   // --- 2) Init a session ---
  //   let mySession: Session = OV.initSession()
  //   setSession(mySession)

  //   // --- 3) Specify the actions when events take place in the session ---
  //   // On every new Stream received...
  //   mySession.on('streamCreated', (event) => {
  //       // Subscribe to the Stream to receive it. Second parameter is undefined
  //       // so OpenVidu doesn't create an HTML video by its own
  //       let subscriber: Subscriber = mySession.subscribe(event.stream, undefined);
  //       // Update the state with the new subscribers
  //       setSubscribers((prevSubscribers) => {
  //         return prevSubscribers.concat(subscriber);
  //     });
  //     });
        
  //   // On every Stream destroyed...
  //   mySession.on('streamDestroyed', (event) => {
  //     const deleteSubscriber = (streamManagerToDelete: any) => {
  //       setSubscribers(prevSubscribers => prevSubscribers.filter(subscriber => subscriber !== streamManagerToDelete));
  //     };
  //   });

  //   // --- 4) Connect to the session with a valid user token ---

  //       // Get a token from the OpenVidu deployment
  //       getToken().then((token: any) => {
  //           // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
  //           // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
  //           mySession
  //               .connect(token, { clientData: myUserName })
  //               .then(async () => {

  //                   // --- 5) Get your own camera stream ---

  //                   // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
  //                   // element: we will manage it on our own) and with the desired properties
  //                   let publisher = await OV.initPublisherAsync(undefined, {
  //                       audioSource: undefined, // The source of audio. If undefined default microphone
  //                       videoSource: undefined, // The source of video. If undefined default webcam
  //                       publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
  //                       publishVideo: true, // Whether you want to start publishing with your video enabled or not
  //                       resolution: '640x480', // The resolution of your video
  //                       frameRate: 30, // The frame rate of your video
  //                       insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
  //                       mirror: false, // Whether to mirror your local video or not
  //                   });

  //                   // --- 6) Publish your stream ---

  //                   mySession.publish(publisher);

  //                   // Obtain the current video device in use
  //                   let devices = await OV.getDevices();
  //                   let videoDevices = devices.filter(device => device.kind === 'videoinput');
  //                   let currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
  //                   let currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

  //                   // Set the main video in the page to display our webcam and store our Publisher
                    
  //                   setDevice(currentVideoDevice)
  //                   setMainStreamManager(publisher)
  //                   setPublisher(publisher)
  //               })
  //               .catch((error) => {
  //                   console.log('There was an error connecting to the session:', error.code, error.message);
  //               });
  //       });
  //   }


  // const leaveSession = () => {

  //     if (session) {
  //         session.disconnect();
  //     }
      
  //     // Empty all properties...
  //     // setOV(null);
  //     setSession(undefined)
  //     setSubscribers([])
  //     setMySessionId(undefined)
  //     setMyUserName(undefined)
  //     setMainStreamManager(null)
  //     setPublisher(undefined)
  //   }
    
  // // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
  // // const leaveSession = () => {
  // //   const mySession = session;

  // //   if (mySession) {
  // //     mySession.disconnect();
  // //   }

  // //   setSession(undefined);
  // //   setSubscribers([]);
  // //   setMySessionId(undefined);
  // //   setMyUserName(undefined);
  // //   setMainStreamManager(undefined);
  // //   setPublisher(undefined);
  // // };

  // const switchCamera = async () => {
  //   try {
  //       const devices = await OV.getDevices()
  //       let videoDevices = devices.filter(device => device.kind === 'videoinput');

  //       if (videoDevices && videoDevices.length > 1) {

  //           let newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

  //           if (newVideoDevice.length > 0) {
  //               // Creating a new publisher with specific videoSource
  //               // In mobile devices the default and first camera is the front one
  //               let newPublisher = this.OV.initPublisher(undefined, {
  //                   videoSource: newVideoDevice[0].deviceId,
  //                   publishAudio: true,
  //                   publishVideo: true,
  //                   mirror: true
  //               });

  //               //newPublisher.once("accessAllowed", () => {
  //               await session.unpublish(this.state.mainStreamManager)

  //               await this.state.session.publish(newPublisher)
  //               this.setState({
  //                   currentVideoDevice: newVideoDevice[0],
  //                   mainStreamManager: newPublisher,
  //                   publisher: newPublisher,
  //               });
  //           }
  //       }
  //   } catch (e) {
  //       console.error(e);
  //   }
  // }

  // const getToken = () => {
  //   return createSession(mySessionId).then((sessionId: any) =>
  //     createToken(sessionId)
  //   );
  // }

  // const createSession = (sessionId: any) => {
  // return new Promise((resolve, reject) => {
  //   let data = JSON.stringify({ customSessionId: sessionId });
  //   axios
  //   .post(`${OPENVIDU_SERVER_URL}/openvidu/api/sessions`, data, {
  //       headers: {
  //       Authorization: `Basic ${btoa(
  //           `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
  //       )}`,
  //       'Content-Type': 'application/json',
  //       },
  //   })
  //   .then((response) => {
  //       resolve(response.data.id);
  //   })
  //   .catch((response) => {
  //       let error = { ...response };
  //       if (error?.response?.status === 409) {
  //       resolve(sessionId);
  //       } else if (
  //       window.confirm(
  //           `No connection to OpenVidu Server. This may be a certificate error at "${OPENVIDU_SERVER_URL}"\n\nClick OK to navigate and accept it. ` +
  //           `If no certificate warning is shown, then check that your OpenVidu Server is up and running at "${OPENVIDU_SERVER_URL}"`
  //       )
  //       ) {
  //       window.location.assign(`${OPENVIDU_SERVER_URL}/accept-certificate`);
  //       }
  //   });
  // });
  // }

  // const createToken = (sessionId: any) => {
  // return new Promise((resolve, reject) => {
  //   let data = {};
  //   axios
  //     .post(
  //         `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`,
  //         data,
  //         {
  //         headers: {
  //             Authorization: `Basic ${btoa(
  //             `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
  //             )}`,
  //             'Content-Type': 'application/json',
  //         },
  //         }
  //     )
  //     .then((response) => {
  //       resolve(response.data.token);
  //     })
  //       .catch((error) => reject(error));
  //     });
  //   }

  // return (
    
  //   <S.Container
  //   className={!inGameChatStatus ? "Container-Son" : "Container-Son-withChat"}
  //   >
  //     <Header />
  //     {!GameStart ? (
  //       <S.Container
  //       className={!inGameChatStatus ? "Container-Son" : "Container-Son-withChat"}
  //       >
  //         <S.InnerContainer>
  //           <S.PlayerVidBundle>

  //             {mainStreamManager !== undefined ? (
  //                 <div id="main-video" className="col-md-6">
  //                     <UserVideoComponent streamManager={mainStreamManager} />
  //                 </div>
  //             ) : null}

  //             <S.PlayerVid></S.PlayerVid>
  //             <S.PlayerVid></S.PlayerVid>
  //             <S.PlayerVid></S.PlayerVid>
  //           </S.PlayerVidBundle>
  //           <S.Middle>
  //             <select
  //               value={selectedGame}
  //               onChange={(e) => setSelectedGame(e.target.value)}
  //             >
  //               <option value="">게임을 선택하세요</option>
  //               <option value={"catchMind"}>캐치마인드</option>
  //               <option value={"sonByeonHo"}>손병호게임</option>
  //               <option value={"sis"}>고요속의 외침</option>
  //             </select>
  //             <button onClick={() => setGameStart(true)}>게임 시작</button>
  //           </S.Middle>
  //           <S.PlayerVidBundle>
  //             <S.PlayerVid></S.PlayerVid>
  //             <S.PlayerVid></S.PlayerVid>
  //             <S.PlayerVid></S.PlayerVid>
  //           </S.PlayerVidBundle>
  //         </S.InnerContainer>
  //       </S.Container>
  //     ) : (
  //       renderSelectedGame()
  //     )}
  //     <RightContainer />
  //   </S.Container>
  // );
};

export default Meeting;


