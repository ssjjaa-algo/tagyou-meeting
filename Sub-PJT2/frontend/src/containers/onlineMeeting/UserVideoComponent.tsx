import { Component } from 'react';

interface OpenViduVideoProps {
  streamManager: any; // You can replace 'any' with the actual type of streamManager if you have it
}

export default class OpenViduVideoComponent extends Component<OpenViduVideoProps> {
  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
  }

  render() {
    return (
      <div>
        {this.props.streamManager !== undefined ? (
          <div className="streamcomponent">
            <video
              className="video"
              ref={(node) => {
                if (node) {
                  this.props.streamManager.addVideoElement(node);
                }
              }}
              autoPlay={true}
              // muted={this.props.streamManager.stream.connection.connectionId === this.props.myConnectionId}
            />
            <div>
              <p>{this.getNicknameTag()}</p>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
