import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Monitor from '../monitor/Monitor';
import Game from '../game/Game';

export class App extends Component {

  constructor(props) {
    super(props);
    this.resizeListener = this.resizeListener.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener, false);
    this.resizeListener();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener, false);
  }

  render() {
    let content;
    if (this.props.game) {
      content = <Game />
    } else {
      content = <Monitor
          restart = { this.props.restart }
          setScroll = { this.resizeListener }
        />
    }
    return (
      <div
        className="App"
        ref={(div) => this.scroller = div}
      >
        <div className={ this.props.flicker ? "flicker flicker-animate" : "flicker" }>
          <div className="interlace"/>
          {content}
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    this.resizeListener();
  }

  resizeListener() {
    if (this.scroller)
      this.scroller.scrollTop = this.scroller.scrollHeight
  }
};

/**
 * Redux container
* */

function mapStateToProps(state) {
  return {
    flicker: state.flicker,
    game: state.gameState.game
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
