import React from 'react';
import './SearchResults.css';
import Track from '../Track/Track';

class SearchResults extends React.Component {

  render() {
    return (<div className="SearchResults">
      <h2>Results</h2>
      <div className="TrackList">
        {
          this.props.tracks.map(track => {
            if (!track.selected) {
              return <Track key={track.id} track={track} onSelect={this.props.onSelect}/>
            }}
          )
        }
      </div>
    </div>);
  }
}

export default SearchResults;
