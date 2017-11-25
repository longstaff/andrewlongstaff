import React, { Component } from 'react';
import { getTimestamp } from '../utils/Utils';
import PercButton from '../perc-button/PercButton';

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
    return <PercButton
        onClick={this.fireClick}
        complete={this.state.percComplete*100}
        total={100}
    >{this.props.children}</PercButton>
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
