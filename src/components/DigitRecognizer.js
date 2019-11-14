import React, { Component } from 'react';
import styles from './DigitRecognizer.module.css';
import Canvas from './Canvas';
import Result from './Result';
import Debugger from './Debugger';

export default class DigitRecognizer extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Canvas
          onAssess={(image) => this.assessDigit(image)}
        />
        <div className={styles.result}>
          <Result />
        </div>
        <div className={styles.debugger}>
          <Debugger />
        </div>
      </div>
    );
  }

  assessDigit(image) {
    this.poolImage(image);
  }

  poolImage(image) {
    console.log(image);
    const data = image.data;

    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
    }
  }
}

