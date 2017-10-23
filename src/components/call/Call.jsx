import React, { Component } from 'react';
import Command from '../command/Command';
import './Call.css'

export default class Call extends Component {
  render() {
    return (
      <div className="Call">
        <Command />
        <p className="Call-text">{this.props.value}</p>
      </div>
    );
  }
}
