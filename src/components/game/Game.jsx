import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { endGame } from '../app/AppActions';
import {
  setProjectComplete,
  addProjectProgress,
} from './GameActions';
import Splash from './splash/Splash';
import Stage1 from './stage1/Stage1';
import { getTimestamp } from './utils/Utils';
import { getProjectsMap, triggerProjectComplete } from './utils/ProjectManager';
import buttonList from './utils/buttonList';

import {
  BUTTON_CODE,
  BUTTON_TEA,
  BUTTON_COFFEE,
  BUTTON_STACK,
  BUTTON_GITHUB,
} from './constants';

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
    this.addCodeLines = this.addCodeLines.bind(this);
    this.addCaffine = this.addCaffine.bind(this);
    this.getProjects = this.getProjects.bind(this);
    this.clickedProject = this.clickedProject.bind(this);

    this.state = {
      splash: true,
      tick: false,

      caffine: 0,
      firstCaffine: 0,
      tailOffCaffine: 0,
      linesMultiplier: 1, //Calculate this based on the unlocked items

      projectSelected: '',
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
      buttons={this.getButtons()}
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
    let amount = lines * this.state.linesMultiplier;
    this.props.addProjectProgress(this.state.projectSelected, amount);
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

  getButtons() {
    let buttons = buttonList.filter(val => (
      this.props.gameState.activeButtons[val.id] !== undefined && this.props.gameState.activeButtons[val.id] === true
    ));
    return buttons.map((val) => {
      return Object.assign({}, val, {
        reset: this.buttonReset(val, this.state.caffine),
        onClick: this.clickedButton.bind(this, val),
      });
    });
  }

  actionMap = {
    [BUTTON_CODE]: this.addCodeLines.bind(this, 1),
    [BUTTON_TEA]: this.addCaffine.bind(this, 1),
    [BUTTON_COFFEE]: this.addCaffine.bind(this, 3),
    [BUTTON_STACK]: this.addCodeLines.bind(this, 100),
    [BUTTON_GITHUB]: this.addCodeLines.bind(this, 1000),
    default: () => {
      throw new Error("Fall off actionMap!")
    }
  }
  resetMap = {
    [BUTTON_CODE]: (caffine) => Math.max(0.5, 5 - caffine),
    [BUTTON_TEA]: () => 20,
    [BUTTON_COFFEE]: () => 50,
    [BUTTON_STACK]: () => 100,
    [BUTTON_GITHUB]: () => 500,
    default: () => {
      throw new Error("Fall off resetMap!")
    }
  }
  clickedButton(button) {
    (this.actionMap[button.id] ? this.actionMap[button.id] : this.actionMap['default'])();
  }
  buttonReset(button, caffine) {
    return (this.resetMap[button.id] ? this.resetMap[button.id] : this.resetMap['default'])(caffine);
  }

  getProjects() {
    let projects = getProjectsMap(this.props);
    return projects.map((val) => {
      return Object.assign({}, val, {
        onClick: this.clickedProject.bind(this, val),
        selected: val.id === this.state.projectSelected,
        completeProject: val.completeProject,
      });
    })
  }
  clickedProject(project, isComplete) {
    if (isComplete) this.completeProject(project);
    else this.selectProject(project);
  }
  completeProject(project) {
    this.props.setProjectComplete(project.id);
    triggerProjectComplete(project.id, this.props.dispatch);
  }
  selectProject(project) {
    this.setState({
      projectSelected: project.id,
    })
  }
}

/**
 * Redux container
* */

function mapStateToProps(state) {
  return {
    gameState: state.game.gameState,
    complete: state.game.complete,
    progress: state.game.progress,
  };
}

function mapDispatchToProps(dispatch, getState) {
  const props = bindActionCreators({
    endGame,
    setProjectComplete,
    addProjectProgress,
  }, dispatch, getState);
  props.dispatch = dispatch;
  return props;
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
