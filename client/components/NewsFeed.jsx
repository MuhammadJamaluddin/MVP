import React from 'react';
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
      <iframe title="test" width="560" height="315" src={`https://www.youtube.com/embed/${video.id.videoId}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
    ));

    return (
      <div style={styles.container}>
        <button className="explore" type="button" onClick={() => { this.explore(); }}>Explore</button>
        <h3 style={styles.title}>This is where the magic happens</h3>
        <ul>{renderedPosts}</ul>
      </div>
    );
  }
}

export default NewsFeed;
