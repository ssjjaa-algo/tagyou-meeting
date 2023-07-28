import React, { Component, ChangeEvent } from 'react';
import axios from 'axios';
import OpenViduSession from 'openvidu-react';

interface AppState {
  mySessionId: string;
  myUserName: string;
  token: string | undefined;
  session: boolean | undefined;
}

class App extends Component<{}, AppState> {
  private readonly APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4443/';

  constructor(props: {}) {
    super(props);
    this.state = {
      mySessionId: 'SessionA',
      myUserName: 'OpenVidu_User_' + Math.floor(Math.random() * 100),
      token: undefined,
      session: undefined,
    };
  }

  handlerJoinSessionEvent() {
    console.log('Join session');
  }

  handlerLeaveSessionEvent() {
    console.log('Leave session');
    this.setState({
      session: undefined,
    });
  }

  handlerErrorEvent() {
    console.log('Leave session');
  }

  handleChangeSessionId(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  async joinSession(event: React.FormEvent) { // 세션 생성 및 토큰 발급
    event.preventDefault();
    if (this.state.mySessionId && this.state.myUserName) {
      const token = await this.getToken();
      this.setState({
        token: token,
        session: true,
      });
    }
  }

  render() {
    const { mySessionId, myUserName, token, session } = this.state;
    return (
      <div>
        {session === undefined ? (
          <div id="join">
            <div id="join-dialog">
              <h1>Join a video session</h1>
              <form onSubmit={this.joinSession.bind(this)}>
                <p>
                  <label>Participant: </label>
                  <input
                    type="text"
                    id="userName"
                    value={myUserName}
                    onChange={this.handleChangeUserName.bind(this)}
                    required
                  />
                </p>
                <p>
                  <label>Session: </label>
                  <input
                    type="text"
                    id="sessionId"
                    value={mySessionId}
                    onChange={this.handleChangeSessionId.bind(this)}
                    required
                  />
                </p>
                <p>
                  <input name="commit" type="submit" value="JOIN" />
                </p>
              </form>
            </div>
          </div>
        ) : (
          <div id="session">
            <OpenViduSession
              id="opv-session"
              sessionName={mySessionId}
              user={myUserName}
              token={token || ''}
              joinSession={this.handlerJoinSessionEvent}
              leaveSession={this.handlerLeaveSessionEvent}
              error={this.handlerErrorEvent}
            />
          </div>
        )}
      </div>
    );
  }

  async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  }

  async createSession(sessionId: string) {
    const response = await axios.post(this.APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data as string; // The sessionId
  }

  async createToken(sessionId: string) {
    const response = await axios.post(this.APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data as string; // The token
  }
}

export default App;