import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import profile_pic from './asset/img/profile_pic.png';
// import ovLogo from './assets/img/openvidu_vert_white_bg_trans_cropped.png';
// import ovLogo2 from './assets/img/openvidu_logo.png';

const OnlineMeeting = () => {
  return (
    <div>
      <header className="App-header">
        {/* <img src={profile_pic} className="App-logo" alt="logo" /> */}
        {/* <img src={reactLogo} className="React-logo" alt="logo" /> */}
      </header>
      <div id="title">
        <a href="http://www.openvidu.io/" target="_blank" rel="noopener noreferrer">
          {/* <img src={profile_pic} className="mainLogo" alt="logo" /> */}
        </a>
      </div>
      <App />
    </div>
  );
};

ReactDOM.render(<OnlineMeeting />, document.getElementById('root'));
registerServiceWorker();


export default OnlineMeeting;