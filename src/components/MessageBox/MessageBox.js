import React from 'react';
import './MessageBox.css';

class MessageBox extends React.Component {
  render() {
    return (
      <div className={`MessageBox ${this.props.message.state}`}>
        <div className="Message-container">
          <h1>{this.props.message.message}</h1>
          <a onClick={this.props.handleMessageOff}>OKAY</a>
        </div>
      </div>
    );
  }
}

export default MessageBox;
