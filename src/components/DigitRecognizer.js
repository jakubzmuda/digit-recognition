import React, { Component } from 'react';
import styles from './DigitRecognizer.module.css';
import Canvas from './Canvas';
import Result from './Result';

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
      </div>
    );
  }

  assessDigit(image) {
    console.log(image);
  }
}

