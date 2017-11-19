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
  caffineTail = 3000;

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
    this.addCodeLines = this.addCodeLines.bind(this);
    this.addCaffine = this.addCaffine.bind(this);
    this.getProjects = this.getProjects.bind(this);

    this.state = {
      splash: true,
      tick: false,

      caffine: 0,
      firstCaffine: 0,
      tailOffCaffine: 0,
      linesMultiplier: 1, //Calculate this based on the unlocked items

      projectCompletion: {
        project1: 1000,
        project2: 500,
        project3: 200,
      },
      projectSelected: 'project1',

      projects: {
        project1: {
          title: 'AI Project',
          total: 2000
        },
        project2: {
          title: 'Other Project',
          total: 2000
        },
        project3: {
          title: 'Disabled Project',
          total: 2000
        }
      }
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
      caffine={this.state.caffine}
      addCode={this.addCodeLines}
      addCaffine={this.addCaffine}
      projects={this.getProjects()}
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
      this.updateFrame(this.now);
    }
    // this.subrender(this.dt);
    this.last = this.now;
    this.frameRequest = requestAnimationFrame(this.runTick);
  }

  addCodeLines(lines) {
    this.props.addCodeLines(lines * this.state.linesMultiplier)
    let project = this.state.projectCompletion[this.state.projectSelected];
    if (project) {
      this.setState({
        projectCompletion: Object.assign({}, this.state.projectCompletion, {
          [this.state.projectSelected]: this.state.projectCompletion[this.state.projectSelected] + lines
        })
      });
    } else {
      this.setState({
        projectCompletion: [
          ...this.state.projectCompletion,
          [this.state.projectSelected]: lines
        ]
      });
    }
  }
  addCaffine(amount) {
    let now = getTimestamp();
    this.setState({
      caffine: this.state.caffine + amount,
      firstCaffine: this.state.firstCaffine || now,
      tailOffCaffine: now + (this.caffineTail * amount),
    })
  }

  updateFrame(timestamp) {
    let newState = {};
    let needsUpdate = false;
    if (this.state.caffine > 0) {
      if (timestamp > this.state.tailOffCaffine) {
        newState.caffine = Math.max(0, this.state.caffine - ((timestamp - this.state.tailOffCaffine) / 1000));
        needsUpdate = true;
      }
    } else if (this.state.firstCaffine) {
      newState.firstCaffine = 0;
      needsUpdate = true;
    }

    if (needsUpdate) this.setState(newState);
  }

  spendCode(amount) {
    this.props.reduceCodeLines(amount);
  }
  addLines(amount) {
    this.props.addCodeLines(amount);
  }

  getProjects() {
    let keys = Object.keys(this.state.projects);
    return keys.map((val) => {
      let project = this.state.projects[val];
      let completion = this.state.projectCompletion[val] || 0;

      return {
        id: val,
        label: project.title,
        complete: completion,
        total: project.total,
        onClick: this.selectProject.bind(this, val),
        selected: this.state.projectSelected === val,
        disabled: false,
      }
    })
  }
  selectProject(key) {
    this.setState({
      projectSelected: key
    })
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
