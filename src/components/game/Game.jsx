import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { endGame } from '../app/AppActions';

export class Game extends Component {
  constructor(props) {
    super(props);
    this.triggerEndGame = this.triggerEndGame.bind(this);
    this.countDownSplash = this.countDownSplash.bind(this);

    this.state = {
      splash: true
    }
  }

  componentDidMount() {
    if (this.state.splash) {
      this.countDownSplash()
    }
  }

  render() {
    var content = this.state.splash ? <h1>Loading Gui...</h1> : <h1>This is a game, click to exit</h1>;
    return (
      <div className="Game" onClick={this.triggerEndGame} >
        {content}
      </div>
    );
  }

  countDownSplash() {
    setTimeout(() => {
      this.setState({
        splash: false
      });
    }, 2000);
  }
  triggerEndGame() {
    this.props.endGame();
  }
}

/**
 * Redux container
* */

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch, getState) {
  return bindActionCreators({
    endGame
  }, dispatch, getState);
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
