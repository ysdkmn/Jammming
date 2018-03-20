import React from 'react';
import './Playlist.css';
import Track from '../Track/Track';

class Playlist extends React.Component {
  render() {
    return (<div className="Playlist">
      <input defaultValue='New Playlist' />
      <div className="TrackList">
        {
          this.props.tracks.map(track => {
            if (track.selected) {
              return <Track key={track.id} track={track} onSelect={this.props.onSelect} />
            }}
          )
        }
      </div>
      <a className="Playlist-save">SAVE TO SPOTIFY</a>
    </div>);
  }
}

export default Playlist;
