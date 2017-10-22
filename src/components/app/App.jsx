import React, { Component } from 'react';
import './App.css';
import Monitor from '../monitor/Monitor';

export default class App extends Component {
  render() {
    return (
      <Monitor
        restart = { this.props.restart }
      />
    );
  }
};
