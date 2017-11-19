import React, { Component } from 'react';
import './PercButton.css';

export default class PercButton extends Component {
  frameRequest = null;

  constructor(props) {
    super(props);
    this.calculatePerc = this.calculatePerc.bind(this);
  }

  render() {
    let perc = this.calculatePerc();

    return <div className={`PercButton${this.props.disabled ? ' PercButton--disabled' : ''}${this.props.selected ? ' PercButton--selected' : ''}`}>
      <p className='PercButton-label PercButton-label-top' style={{
        clip: `rect(0px, ${perc * 200}px, 30px, 0px)`,
      }}>{this.props.children}</p>
      <div className='PercButton-progress' style={{width: Math.round(perc * 100) + '%'}}/>
      <p className='PercButton-label PercButton-label-bottom'>{this.props.children}</p>
      <button
        className='PercButton-button'
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      ></button>
    </div>
  }
  calculatePerc() {
    return Math.max(0, Math.min(1, this.props.complete/this.props.total));
  }
}
