import React, { Component } from 'react';
import styles from './Debugger.module.css';

export default class Debugger extends Component {

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.inputImage) {
      this.drawImage(this.props.inputImage);
    }
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

  canvas() {
    return this.refs.canvas;
  }

  drawImage(image) {
    console.log('drawing image');
    for (let y = 0; y < image.length; y++) {
      for (let x = 0; x < image[0].length; x++) {
        this.drawPixel(x, y, image[x][y] * 255);
      }
    }
  }

  drawPixel(x, y, r) {
    console.log();
    const canvas = this.canvas();
    const context = canvas.getContext('2d');

    context.fillStyle = "rgba(" + r + "," + r + "," + r + "," + 1 + ")";
    context.fillRect(x, y, 1, 1);
  }
}
