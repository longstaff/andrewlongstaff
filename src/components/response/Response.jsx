import React, { Component } from 'react';
import './Response.css';

export default class Response extends Component {
  render() {
    let output;
    if (Array.isArray(this.props.value)) {
      output = this.props.value.map(this.drawLine);
    } else {
      output = this.drawLine(this.props.value, 0);
    }

    return (
      <div>
        {output}
      </div>
    );
  }

  drawLine(line, ind) {
    let value = line;
    let classNameAdd = '';
    if (typeof line === 'object') {
      value = line.value;
      if (line.colour) {
        classNameAdd = `Response-colour-${line.colour}`;
      }
    }
    return <p className={`Response ${classNameAdd}`} key={ind}>{value}</p>;
  }
}
