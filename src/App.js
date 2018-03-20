import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [
        {id: 1,
        title: "It's Not Right But It's Okay",
        info: "Whitney Houston | My Love Is Your Love",
        selected: false},
        {id: 2,
        title: "It's Not Right But It's Okay",
        info: "Whitney Houston | My Love Is Your Love",
        selected: false},
        {id: 3,
        title: "It's Not Right But It's Okay",
        info: "Whitney Houston | My Love Is Your Love",
        selected: true},
        {id: 4,
        title: "It's Not Right But It's Okay",
        info: "Whitney Houston | My Love Is Your Love",
        selected: false}
      ],
      clicked: false
    };
    this.handleSelectTrack = this.handleSelectTrack.bind(this);
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

  render() {
    return (
      <div className="App-container">
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults tracks={this.state.tracks}
              onSelect={this.handleSelectTrack} />
            <Playlist tracks={this.state.tracks}
              onSelect={this.handleSelectTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
