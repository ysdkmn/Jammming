import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [
        {title: "It's Not Right But It's Okay",
        info: "Whitney Houston | My Love Is Your Love",
        selected: false},
        {title: "It's Not Right But It's Okay",
        info: "Whitney Houston | My Love Is Your Love",
        selected: false},
        {title: "It's Not Right But It's Okay",
        info: "Whitney Houston | My Love Is Your Love",
        selected: true},
        {title: "It's Not Right But It's Okay",
        info: "Whitney Houston | My Love Is Your Love",
        selected: false}
      ]
    }
  }
  render() {
    return (
      <div className="App-container">
        <h1>Ja<span class="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults tracks={this.state.tracks} />
            <Playlist tracks={this.state.tracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
