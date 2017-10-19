import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as MonitorActions from './MonitorActions';

export class Monitor extends Component {
  constructor(props) {
    super(props);
    this.sendFocusRequest = this.sendFocusRequest.bind(this);
    this.testCompleteMessage = this.testCompleteMessage.bind(this);
  }

  render() {
    return (
      <div onClick={this.sendFocusRequest} >
        <h1>MONITOR</h1>
        <input
          ref={(input) => {this.textInput = input;}}
          type="text"
          onKeyPress={this.testCompleteMessage}
        />
        {this.props.history.map(val => (<p key={val.id}>{val.call}:{val.response}</p>))}
      </div>
    );
  }

  sendFocusRequest() {
    this.textInput.focus();
  }

  testCompleteMessage(ev) {
    if (ev.key === 'Enter') {
      this.completeMessage(ev.target.value);
    }
  }
  completeMessage(val) {
    this.props.addCall(val, 'Response');
    this.textInput.value = '';
  }
}

/**
 * Redux container
* */

function mapStateToProps(state) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...MonitorActions
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Monitor);
