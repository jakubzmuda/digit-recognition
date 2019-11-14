import React, { Component } from 'react';
import styles from './App.module.css';
import DigitRecognizer from './components/DigitRecognizer';

class App extends Component {
  render() {
    return (
      <div className={styles.container}>
        <DigitRecognizer />
      </div>
    );
  }
}

export default App;
