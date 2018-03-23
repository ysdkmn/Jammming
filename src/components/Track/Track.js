import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect() {
  this.props.onSelect(this.props.track);
  }
  broom () {
    
  }
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.title}</h3>
          <p>{`${this.props.track.artist} | ${this.props.track.album}`}</p>
        </div>
        <a className="Track-action" onClick={this.handleSelect}>
        {this.props.track.selected?"-":"+"}</a>
      </div>
    );
  }
}

export default Track;
