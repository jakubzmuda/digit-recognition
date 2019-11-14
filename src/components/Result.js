import React, { Component } from 'react';
import styles from './Result.module.css';

export default class Result extends Component {
  render() {
    return (
      <div className={styles.container}>
        I think the result is ...
      </div>
    );
  }
}

