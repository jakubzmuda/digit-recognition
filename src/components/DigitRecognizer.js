import React, { Component } from 'react';
import styles from './DigitRecognizer.module.css';
import Canvas from './Canvas';
import Result from './Result';
import Debugger from './Debugger';
import Image from '../Image';
import NeuralNet from '../net/NeuralNet';

export default class DigitRecognizer extends Component {

  state = {
    debuggerImage: null,
    netOutput: null
  };

  render() {
    return (
      <div className={styles.container}>
        <Canvas
          onAssess={(image) => this.assessDigit(image)}
        />
        <div className={styles.result}>
          <Result
            netOutput={this.state.netOutput}
          />
        </div>
        <div className={styles.debugger}>
          <Debugger inputImage={this.state.debuggerImage} />
        </div>
      </div>
    );
  }

  assessDigit(image) {
    const image28px = this.poolImage(image);
    const inputVector = this.flattenImageToVector(image28px);
    const output = new NeuralNet().evaluateForVector(inputVector);
    this.setState({
      debuggerImage: image28px,
      netOutput: output
    })
  }

  poolImage(canvasImage) {
    const image = new Image(canvasImage);
    return image.as28pxImage();
  }

  flattenImageToVector(image28px) {
    const flattenedArray = [].concat(...image28px);
    return flattenedArray.map(value => value / 255);
  }
}

