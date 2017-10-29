import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as MonitorActions from './MonitorActions';
import Prompt from '../prompt/Prompt';
import Call from '../call/Call';
import Response from '../response/Response';
import './Monitor.css';

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
    let history = this.renderHistory(this.props.history);
    let prompt;
    if (this.props.loader.loading === true) {
      prompt = '';
      this.prompt = null;
    } else {
      prompt = <Prompt
        onComplete = {this.completeMessage}
        onChange = {this.updateMessage}
        value = {this.state.promptVal}
        ref={(Prompt) => {this.prompt = Prompt;}}
      />
    }

    return (
      <div className="Monitor" onClick={this.sendFocusRequest} >
        <ol className={ this.props.loader.loading ? 'Monitor-list Monitor-list_no-prompt' : 'Monitor-list'}>
          {history}
        </ol>
        {prompt}
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    this.sendFocusRequest();
    this.props.setScroll();
  }

  renderHistory(history) {
    return history.map(val => {
      let call = val.call ? <Call value = {val.call}/> : '';
      let response = val.response ? <Response value = {val.response}/> : <Response value = "..." />

      return <li key={val.id} className="Monitor-list-item">
        {call}
        {response}
      </li>
    });
  }

  sendFocusRequest() {
    if (this.prompt !== null)
      this.prompt.focus();
  }
  completeMessage(val) {
    this.props.sendCall(val);

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
