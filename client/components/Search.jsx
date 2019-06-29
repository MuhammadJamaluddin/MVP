import React from 'react';
import SearchField from 'react-search-field';
import styles from './styles';
import keys from '../../configuration';

class Search extends React.Component {
  static subscribe(event) {
    console.log(event.target.parentNode.getAttribute('id'));
    const data = {
      channelId: event.target.parentNode.getAttribute('id'),
    };

    fetch('http://localhost:3000/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .catch((err) => {
        console.log(err);
      });
  }

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

  render() {
    const { resources } = this.state;

    const renderedResources = resources.map(channel => (
      <div className="subscriptionWrapper" key={channel.snippet.channelId} id={channel.snippet.channelId}>
        <img src={channel.snippet.thumbnails.default.url} alt="channel" />
        <a href={`https://www.youtube.com/channel/${channel.snippet.channelId}/featured?disable_polymer=1`} className="subscription">{channel.snippet.title}</a>
        <button className="subscribe" type="button" onClick={(event) => { Search.subscribe(event); }}>Subscribe</button>
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
