import React from 'react';
import './Track.css';

class Track extends React.Component {
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.title}</h3>
          <p>{this.props.track.info}</p>
        </div>
        <a className="Track-action">
        {this.props.track.selected?"-":"+"}</a>
      </div>
    );
  }
}

export default Track;
