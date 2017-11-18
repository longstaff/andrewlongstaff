import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { endGame } from '../app/AppActions';
import { addCodeLines, reduceCodeLines } from './GameActions';
import Splash from './splash/Splash';
import Stage1 from './stage1/Stage1';
import { getTimestamp } from './utils/Utils';

export class Game extends Component {
  step = 1/60;
  now;
  dt = 0;
  last;
  frameRequest = null;

  constructor(props) {
    super(props);
    this.triggerEndGame = this.triggerEndGame.bind(this);
    this.countDownSplash = this.countDownSplash.bind(this);
    this.stopTick = this.stopTick.bind(this);
    this.startTick = this.startTick.bind(this);
    this.runTick = this.runTick.bind(this);
    this.updateFrame = this.updateFrame.bind(this);
    this.spendCode = this.spendCode.bind(this);
    this.addLines = this.addLines.bind(this);

    this.state = {
      splash: true,
      tick: false,
    }
  }

  componentDidMount() {
    if (this.state.splash) {
      this.countDownSplash()
    }
  }
  componentWillUnmount() {
    this.stopTick();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.tick && !this.state.tick) {
      this.stopTick();
    } else if (!prevState.tick && this.state.tick) {
      this.startTick();
    }
  }

  render() {
    let content;
    if (this.state.splash) content = <Splash />;
    else content = <Stage1
      totalCodeLines={this.props.gameState.totalCodeLines}
      unlockMap={this.props.gameState.unlockMap}
      availableCodeLines={this.props.gameState.codeLines}
      spendCode={this.spendCode}
      addLines={this.addLines}
      quitHandler={this.triggerEndGame}
    />;

    return (
      <div className="Game">
        {content}
      </div>
    );
  }

  countDownSplash() {
    setTimeout(() => {
      this.setState({
        splash: false,
        tick: true,
      });
    }, 2000);
  }
  triggerEndGame() {
    this.props.endGame();
  }
  stopTick() {
    if (this.frameRequest) cancelAnimationFrame(this.frameRequest);
  }
  startTick() {
    this.last = getTimestamp();
    this.frameRequest = requestAnimationFrame(this.runTick);
  }
  runTick() {
    this.now = getTimestamp();
    this.dt = this.dt + Math.min(1, (this.now - this.last) / 1000);
    while (this.dt > this.step) {
      this.dt = this.dt - this.step;
      this.updateFrame(this.step);
    }
    // this.subrender(this.dt);
    this.last = this.now;
    this.frameRequest = requestAnimationFrame(this.runTick);
  }

  updateFrame() {
    // this.props.addCodeLines(1);
  }

  spendCode(amount) {
    this.props.reduceCodeLines(amount);
  }
  addLines(amount) {
    this.props.addCodeLines(amount);
  }
}

/**
 * Redux container
* */

function mapStateToProps(state) {
  return {
    gameState: state.game.gameState
  };
}

function mapDispatchToProps(dispatch, getState) {
  return bindActionCreators({
    endGame,
    addCodeLines,
    reduceCodeLines,
  }, dispatch, getState);
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
