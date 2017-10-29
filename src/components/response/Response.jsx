import React, { Component } from 'react';
import './Response.css';

export default class Response extends Component {

  constructor(props) {
    super(props);

    this.drawLine = this.drawLine.bind(this);
  }

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
    let value;
    let classNameAdd = '';
    if (typeof line === 'object') {
      value = this.parseVal(line.value);
      if (line.colour) {
        classNameAdd = `Response-colour-${line.colour}`;
      }
    } else {
      value = this.parseVal(line);
    }
    return <p className={`Response ${classNameAdd}`} key={ind}>{value}</p>;
  }

  parseVal(line) {
    let value = line.value || line;

    return Array.prototype.concat.call([], value.split(/\*{3,3}/).map((val, ind) => {
      let retVal;
      if (ind % 2 === 0) {
        retVal = val.split(/\*{2,2}/).map((val, ind) => ind % 2 === 0 ? val : <span key={ind} className="Response-highlight">{val}</span>);
      } else {
        retVal = [<span key={ind} className="Response-link">{val}</span>]
      }
      return retVal;
    }));
  }
}
