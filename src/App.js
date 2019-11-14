import React, { Component } from 'react';
import styles from './App.module.css';
import DigitRecognizer from './components/DigitRecognizer';
import ModelSeedGenerator from './net/ModelSeedGenerator';

class App extends Component {

  componentDidMount() {
    const model = new ModelSeedGenerator().generate(28*28);
    console.log(model);
  }

  render() {
    return (
      <div className={styles.container}>
        <DigitRecognizer />
      </div>
    );
  }
}

export default App;
