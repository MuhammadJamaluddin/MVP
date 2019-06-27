import React from 'react';
import SearchField from 'react-search-field';
import styles from './styles';
import keys from '../../configuration';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: [],
    };
  }

  search(value) {
    const url = new URL('https://www.googleapis.com/youtube/v3/search');

    const params = {
      part: 'snippet',
      q: value,
      key: keys.YouTube_API_key,
      order: 'viewCount',
      maxResults: 10,
      type: 'channel',
    };

    url.search = new URLSearchParams(params);

    fetch(url)
      .then(response => response.json())
      .then((response) => {
        console.log(response);
        console.log(response.items);
        this.setState(() => (
          {
            resources: response.items,
          }
        ));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  subscribe(event) {
    console.log(this);
    console.log(event.target.parentNode.getAttribute('id'));

    fetch('http://localhost:3000/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event.target.parentNode.getAttribute('id'))
    })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { resources } = this.state;

    const renderedResources = resources.map(channel => (
      <div key={channel.snippet.channelId} id={channel.snippet.channelId}>
        <li>{channel.snippet.title}</li>
        <button className="subscribe" type="button" onClick={(event) => { this.subscribe(event); }}>Subscribe</button>
      </div>
    ));

    return (
      <div style={styles.container}>
        <h3 style={styles.title}>This is where the user subscribe to his preferred sources</h3>
        <SearchField placeholder="Search..." onEnter={(value) => { this.search(value); }} onSearchClick={(value) => { this.search(value); }} />
        <ul>{renderedResources}</ul>
      </div>
    );
  }
}

export default Search;
