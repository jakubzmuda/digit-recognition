import React, { Component } from 'react';
import styles from './Debugger.module.css';

export default class Debugger extends Component {

  // here paste the image to debug
  inputData() {

  }

  componentDidMount() {
    this.initCanvas()
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.label}>Debugger</div>
        <div className={styles.canvas}>
          <canvas
            ref={'canvas'}
            width="28"
            height="28"
          />
        </div>
      </div>
    );
  }

  initCanvas() {
    const canvas = this.canvas();
  }

  canvas() {
    return this.refs.canvas;
  }
}
