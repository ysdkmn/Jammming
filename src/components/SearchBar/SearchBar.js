import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ' '
    };
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePressEnterKey = this.handlePressEnterKey.bind(this);
  }

  handleTermChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  handleSearch() {
    this.props.searchSpotify(this.state.searchTerm);
  }

  handlePressEnterKey(event) {
      if (event.key === 'Enter') {
        this.handleSearch();
      }
    }

  render() {
    return (
      <div className="SearchBar" onKeyPress={this.handlePressEnterKey}>
        <input placeholder="Enter A Song Title" onChange={this.handleTermChange} />
        <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
