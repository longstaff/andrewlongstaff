import React, { Component } from 'react';
import './Response.css';

export default class Response extends Component {
  render() {
    return (
      <p className="Response">{this.props.value}</p>
    );
  }
}
