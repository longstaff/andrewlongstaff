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
    let noop = this.parseThroughVal;
    let highlights = this.getHighlightsVals.bind(this, noop);
    let links = this.getLinksVals.bind(this, highlights);
    let images = this.getImgsVals.bind(this, links);

    return images(value);
  }
  parseThroughVal(val) {
    return val;
  }
  parseInd(base = this.parseThroughVal, active = this.parseThroughVal, val, ind) {
    return ind % 2 === 0 ? base(val, ind) : active(val, ind);
  }
  makeValArr(valFunc, val, ind) {
    let ret = valFunc(val, ind);
    if (!Array.isArray(ret)) ret = [ret];
    return ret;
  }

  getHighlightsVals(nextCall = this.parseThroughVal, value) {
    return Array.prototype.concat.call([], this.getHighlights(value).map(
      this.makeValArr.bind(this, this.parseInd.bind(this, nextCall, this.addHighlights))
    ));
  }
  getHighlights(val) {
    return val.split(/\*{2,2}/);
  }
  addHighlights(val, key) {
    return <span key={key} className="Response-highlight">{val}</span>
  }

  getLinksVals(nextCall = this.parseThroughVal, value) {
    return Array.prototype.concat.call([], this.getLinks(value).map(
      this.makeValArr.bind(this, this.parseInd.bind(this, nextCall, this.addLink))
    ));
  }
  getLinks(val) {
    return val.split(/\*{3,3}/);
  }
  addLink(val, key) {
    return <span key={key} className="Response-link">{val}</span>
  }

  getImgsVals(nextCall = this.parseThroughVal, value) {
    return Array.prototype.concat.call([], this.getImgs(value).map(
      this.makeValArr.bind(this, this.parseInd.bind(this, nextCall, this.addImg))
    ));
  }
  getImgs(val) {
    return val.split(/[[\]]/);
  }
  addImg(val, key) {
    return <img key={key} className="Response-img" src={val} alt=""/>
  }
}
