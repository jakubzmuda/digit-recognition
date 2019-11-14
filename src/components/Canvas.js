import React, { Component } from 'react';
import styles from './Canvas.module.css';

export default class Canvas extends Component {

  componentDidMount() {
    this.draw()
  }

  render() {
    return (
      <div className={styles.container}>
        <canvas
          ref={'canvas'}
          width="400"
          height="400"
        />
      </div>
    );
  }

  draw() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.fillRect(0,0, 400, 400);
  }
}

