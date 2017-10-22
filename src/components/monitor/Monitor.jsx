import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as MonitorActions from './MonitorActions';
import Prompt from '../prompt/Prompt';

export class Monitor extends Component {
  constructor(props) {
    super(props);
    this.sendFocusRequest = this.sendFocusRequest.bind(this);
    this.completeMessage = this.completeMessage.bind(this);
    this.updateMessage = this.updateMessage.bind(this);

    this.state = {
      promptVal: ''
    };
  }

  componentDidMount() {
    if (this.props.restart) {
      this.props.addMessage("Welcome Back");
    }
  }

  render() {
    return (
      <div onClick={this.sendFocusRequest} >
        <h1>MONITOR</h1>
        <Prompt
          onComplete = {this.completeMessage}
          onChange = {this.updateMessage}
          value = {this.state.promptVal}
          ref={(Prompt) => {this.prompt = Prompt;}}
        />
        {this.props.history.map(val => (<p key={val.id}>{val.call}:{val.response}</p>))}
      </div>
    );
  }

  sendFocusRequest() {
    this.prompt.focus();
  }
  completeMessage(val) {

    if (val === "clear") {
      this.props.clearHistory();
    } else {
      this.props.addCall(val, 'Response');
    }

    this.setState({
      promptVal: ''
    })
  }
  updateMessage(val) {
    this.setState({
      promptVal: val
    })
  }
}

/**
 * Redux container
* */

function mapStateToProps(state) {
  return {
    history: state.monitor.history,
    loader: state.monitor.loader,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...MonitorActions
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Monitor);
