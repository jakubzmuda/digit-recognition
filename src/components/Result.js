import React, { Component } from 'react';
import styles from './Result.module.css';

export default class Result extends Component {
  render() {
    const guessedNumber = this.props.guessedNumber;
    if (guessedNumber) {
      return (
        <div className={styles.container}>
          I think the result is {guessedNumber}
        </div>
      );
    }
    return (
      <div className={styles.container}>
        Draw a digit and hit go
      </div>
    )
  }
}

