import React from 'react';
import './Playlist.css';
import Track from '../Track/Track';

class Playlist extends React.Component {
  render() {
    return (<div class="Playlist">
      <input placeholder='New Playlist' />
      <div class="TrackList">
        {
          this.props.tracks.map(track => {
            if (track.selected) {
              return <Track key={track.name} track={track}/>
            }}
          )
        }
      </div>
      <a class="Playlist-save">SAVE TO SPOTIFY</a>
    </div>);
  }
}

export default Playlist;
