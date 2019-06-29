import React from 'react';
import ReactPlayer from 'react-player';
import styles from './styles';
import keys from '../../configuration';

class NewsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  explore() {
    const uploads = [];

    const url = new URL('https://www.googleapis.com/youtube/v3/search');

    const params = {
      part: 'snippet',
      key: keys.YouTube_API_key,
      maxResults: 10,
      order: 'date',
    };

    fetch('http://localhost:3000/subscribe')
      .then(response => response.json())
      .then((response) => {
        for (let i = 0; i < response.length; i += 1) {
          params.channelId = response[i].channelId;
          url.search = new URLSearchParams(params);
          uploads.push(
            fetch(url)
              .then(uploadResponse => uploadResponse.json())
              .then(uploadResponse => uploadResponse.items)
              .catch((err) => {
                console.log(err);
              }),
          );
        }
      })
      .then(() => Promise.all(uploads))
      .then((posts) => {
        this.setState(() => (
          {
            posts: posts.flat(),
          }
        ));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { posts } = this.state;

    const renderedPosts = posts.map(video => (
      <div className="wrapper">
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            url={`https://www.youtube.com/watch?v=${video.id.videoId}`}
            light={video.snippet.thumbnails.high.url}
            width="100%"
            height="100%"
            controls="true"
          />
        </div>
      </div>
    ));

    return (
      <div style={styles.container}>
        <button className="explore" type="button" onClick={() => { this.explore(); }}>Explore</button>
        <h3 style={styles.title}>This is where the magic happens</h3>
        {renderedPosts}
      </div>
    );
  }
}

export default NewsFeed;
