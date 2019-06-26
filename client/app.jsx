import React from 'react';
import { render } from 'react-dom';
import Feedly from './components/Feedly';

const styles = {
  fontFamily: 'sans-serif',
  backgroundColor: 'white',
};

const App = () => (
  <div style={styles}>
    <Feedly />
  </div>
);

render(<App />, document.getElementById('app'));
