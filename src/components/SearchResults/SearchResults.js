import React from 'react';
import './SearchResults.css';
import Track from '../Track/Track';

class SearchResults extends React.Component {

  render() {
    return (<div class="SearchResults">
      <h2>Results</h2>
      <div class="TrackList">
        {
          this.props.tracks.map(track => {
            if (!track.selected) {
              return <Track key={track.name} track={track}/>
            }}
          )
        }
      </div>
    </div>);
  }
}

export default SearchResults;
