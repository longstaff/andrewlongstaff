import React, { Component } from 'react';
import './App.css';
import Monitor from '../monitor/Monitor';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.resizeListener = this.resizeListener.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener, false);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener, false);
  }

  render() {
    return (
      <div
        className="App"
        ref={(div) => this.scroller = div}
      >
        <div className="flicker">
          <div className="interlace"/>
          <Monitor
            restart = { this.props.restart }
            setScroll = { this.resizeListener }
          />
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    this.resizeListener();
  }

  resizeListener() {
    this.scroller.scrollTop = this.scroller.scrollHeight
  }
};
