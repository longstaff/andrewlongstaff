import React, { Component } from 'react';
import { getTimestamp } from '../utils/Utils';
import './TimedButton.css';

export default class TimedButton extends Component {
  frameRequest = null;

  constructor(props) {
    super(props);
    this.fireClick = this.fireClick.bind(this);
    this.startCount = this.startCount.bind(this);
    this.calculatePerc = this.calculatePerc.bind(this);

    this.state = {
      percComplete: 1,
    }
  }

  render() {
    return <div className='TimedButton'>
      <p className='TimedButton-label TimedButton-label-top' style={{
        width: 100,
        clip: `rect(0px, ${this.state.percComplete * 200}px, 30px, 0px)`,
      }}>{this.props.children}</p>
      <div className='TimedButton-progress' style={{width: Math.round(this.state.percComplete * 100) + '%'}}/>
      <p className='TimedButton-label TimedButton-label-bottom'>{this.props.children}</p>
      <button
        className='TimedButton-button'
        onClick={this.fireClick}
        disabled={this.state.percComplete < 1}
      ></button>
    </div>
  }
  componentWillUnmount() {
    if (this.frameRequest) {
      cancelAnimationFrame(this.frameRequest);
    }
  }
  componentDidUpdate(oldProps, oldState) {
    if (this.state.percComplete < 1 && oldProps.resetSeconds !== this.props.resetSeconds) {
      this.setState({
        clickTime:  getTimestamp() - (this.state.percComplete * (this.props.resetSeconds * 1000)),
      });
      this.frameRequest = requestAnimationFrame(this.calculatePerc);
    }
  }

  fireClick() {
    if (this.state.percComplete >= 1) {
      this.props.onClick();
      this.startCount();
    }
  }
  startCount() {
    this.setState({
      percComplete: 0,
      clickTime: getTimestamp(),
    });
    this.frameRequest = requestAnimationFrame(this.calculatePerc);
  }
  calculatePerc() {
    let now = getTimestamp();
    let dt = (now - this.state.clickTime) / 1000;
    let perc = Math.min(1, dt/(this.props.resetSeconds));

    this.setState({
      percComplete: perc,
    });

    if (perc < 1) {
      this.frameRequest = requestAnimationFrame(this.calculatePerc);
    }
  }
}
