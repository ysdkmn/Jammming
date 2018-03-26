import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  render() {
    return (<div className="Playlist">
      <input defaultValue='New Playlist' onChange={this.props.handleTitleChange}/>
      <TrackList tracks={this.props.tracks.filter(track => track.selected)} onSelect={this.props.onSelect} />
      <div className="Playlist-save">
        <a onClick={this.props.postPlaylistToSpotify}>SAVE TO SPOTIFY</a>
      </div>
    </div>);
  }
}

export default Playlist;
