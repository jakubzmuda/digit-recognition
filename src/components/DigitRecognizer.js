import React, { Component } from 'react';
import styles from './DigitRecognizer.module.css';
import Canvas from './Canvas';
import Result from './Result';

export default class DigitRecognizer extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Canvas />
        <div className={styles.result}>
          <Result />
        </div>
      </div>
    );
  }
}

