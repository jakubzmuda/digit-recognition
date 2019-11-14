import React, { Component } from 'react';
import styles from './Canvas.module.css';
import ReactDOM from 'react-dom';

export default class Canvas extends Component {

  pressed = false;
  moves = [];

  componentDidMount() {
    this.initCanvas()
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

  initCanvas() {
    const canvas = this.refs.canvas;

    canvas.addEventListener('mousedown', (e) => {
      this.pressed = true;
      this.moves.push([e.pageX - this.pageOffsetLeft(),
        e.pageY - this.pageOffsetTop(),
        false]);
      this.redraw();
    });

    canvas.addEventListener('mousemove', (e) => {
      if (this.pressed) {
        this.moves.push([e.pageX - this.pageOffsetLeft(),
          e.pageY - this.pageOffsetTop(),
          true]);
        this.redraw();
      }
    });

    canvas.addEventListener('mouseup', (e) => {
      this.pressed = false;
    });

    canvas.addEventListener('mouseleave', (e) => {
      this.pressed = false;
    });
  }

  redraw() {
    const canvas = this.refs.canvas;
    const context = canvas.getContext('2d');

    context.strokeStyle = "#0000a0";
    context.lineJoin = "round";
    context.lineWidth = 6;

    for (let i = 0; i < this.moves.length; i++) {
      context.beginPath();
      if (this.moves[i][2] && i) {
        context.moveTo(this.moves[i - 1][0], this.moves[i - 1][1]);
      } else {
        context.moveTo(this.moves[i][0], this.moves[i][1]);
      }
      context.lineTo(this.moves[i][0], this.moves[i][1]);
      context.closePath();
      context.stroke();
    }
    this.forceUpdate();
  }

  pageOffsetLeft() {
    const rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    return rect.left;
  }

  pageOffsetTop() {
    const rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    return rect.top;
  }

}

