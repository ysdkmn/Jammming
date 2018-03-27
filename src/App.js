import React, {Component} from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import Spotify from './util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      playlist_title: 'New Playlist'
    };
    this.handleSelectTrack = this.handleSelectTrack.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.postPlaylistToSpotify = this.postPlaylistToSpotify.bind(this);
  }

  handleSelectTrack(track) {
    let tracks = this.state.tracks;
    if (tracks.find(x => x.id === track.id).selected) {
      tracks.find(x => x.id === track.id).selected = false;
    } else {
      tracks.find(x => x.id === track.id).selected = true;
    }
    this.setState({tracks: tracks});
  }

  searchSpotify(searchTerm) {
    if (Spotify.getAccessToken()) {
      if (searchTerm === ' ') {
        return console.log("please enter a valid search term");
      } else {
        let selectedTracks = this.state.tracks.filter(track => track.selected);
        Spotify.search(searchTerm).then(tracks => this.setState({tracks: selectedTracks.concat(tracks)}));
      }
    }
  }

  handleTitleChange(event) {
    this.setState({playlist_title: event.target.value});
  }

  postPlaylistToSpotify() {
    if (Spotify.getAccessToken()) {
      if (this.state.tracks.filter(track => track.selected).length === 0) {
        return console.log("Please add tracks to playlist");
      }
      console.log("Are you ready to create your playlist? Selecting yes will save this playlist to your spotify account!")
      Spotify.savePlaylist(this.state.playlist_title, this.state.tracks)
      .then(() => {
        this.setState({tracks: [], playlist_title: 'New Playlist'})
        return document.getElementById("playlistTitle").value = 'New Playlist';
      });
    }
  }

  render() {
    return (<div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar searchSpotify={this.searchSpotify}/>
        <div className="App-playlist">
          <SearchResults tracks={this.state.tracks} onSelect={this.handleSelectTrack}/>
          <Playlist tracks={this.state.tracks} onSelect={this.handleSelectTrack} handleTitleChange={this.handleTitleChange} postPlaylistToSpotify={this.postPlaylistToSpotify}/>
        </div>
      </div>
    </div>);
  }
}

export default App;
