import React, {Component} from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import Spotify from './util/Spotify';
import MessageBox from './components/MessageBox/MessageBox';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      playlist_title: 'New Playlist',
      message: {
        message: 'Message Here',
        state: 'off'
      }
    };
    this.handleSelectTrack = this.handleSelectTrack.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.postPlaylistToSpotify = this.postPlaylistToSpotify.bind(this);
    this.handleMessageOff = this.handleMessageOff.bind(this);
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
        return this.setState({message: {
          message: "Please enter a valid search term",
          state: 'on'
        }});
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
        return this.setState({message: {
          message: "Please add tracks to your playlist",
          state: 'on'
        }});
      }
      if (this.state.playlist_title === "") {
        return this.setState({message: {
          message: "Please add a title to your playlist",
          state: 'on'
        }});
      }
      Spotify.savePlaylist(this.state.playlist_title, this.state.tracks)
      .then(() => {
        this.setState({
          tracks: [],
          playlist_title: 'New Playlist',
          message: {
            message: "Playlist successfully saved to Spotify!",
            state: 'on'
          }
        })
        return document.getElementById("playlistTitle").value = 'New Playlist';
      });
    }
  }

  handleMessageOff() {
    this.setState({message: {
      message: 'Message Here',
      state: 'off'
    }})
  }

  render() {
    return (<div>
      <MessageBox message={this.state.message} handleMessageOff={this.handleMessageOff}/>
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
