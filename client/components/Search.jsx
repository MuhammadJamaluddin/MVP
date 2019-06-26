import React from 'react';
import SearchField from 'react-search-field';
import styles from './styles';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  search(value) {
    console.log(this);
    console.log(value);
  }

  render() {
    return (
      <div style={styles.container}>
        <h3 style={styles.title}>This is where the user subscribe to his preferred sources</h3>
        <SearchField placeholder="Search..." onEnter={(value) => { this.search(value); }} onSearchClick={(value) => { this.search(value); }} />
      </div>
    );
  }
}

export default Search;
