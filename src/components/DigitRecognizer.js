import React, { Component } from 'react';
import styles from './DigitRecognizer.module.css';
import Canvas from './Canvas';
import Result from './Result';
import Debugger from './Debugger';
import Image from '../Image';

export default class DigitRecognizer extends Component {

  state = {
    debuggerImage: null
  };

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
          <Debugger inputImage={this.state.debuggerImage}/>
        </div>
      </div>
    );
  }

  assessDigit(image) {
    this.poolImage(image);
  }

  poolImage(canvasImage) {
    const image = new Image(canvasImage);
    const smallImage = image.as28pxImage();
    this.setState({debuggerImage: smallImage});
  }
}

