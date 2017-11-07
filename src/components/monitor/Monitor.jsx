import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as MonitorActions from './MonitorActions';
import History from '../history/History';
import Prompt from '../prompt/Prompt';
import './Monitor.css';

export class Monitor extends Component {
  constructor(props) {
    super(props);
    this.sendFocusRequest = this.sendFocusRequest.bind(this);
    this.completeMessage = this.completeMessage.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.historyScrollUp = this.historyScrollUp.bind(this);
    this.historyScrollDown = this.historyScrollDown.bind(this);

    this.state = {
      promptVal: '',
      historyInd: 0,
    };
  }

  componentDidMount() {
    if (this.props.restart) {
      this.props.addWelcomeMessageIfNeeded();
    }
  }

  render() {
    let prompt;
    if (this.props.loader.loading === true) {
      prompt = '';
      this.prompt = null;
    } else {
      prompt = <Prompt
        onComplete = {this.completeMessage}
        onChange = {this.updateMessage}
        onHistoryScrollUp = {this.historyScrollUp}
        onHistoryScrollDown = {this.historyScrollDown}
        value = {this.state.promptVal}
        ref={(Prompt) => {this.prompt = Prompt;}}
      />
    }

    return (
      <div className="Monitor" onClick={this.sendFocusRequest} >
        <History
          prompt = {!this.props.loader.loading}
          history = {this.props.history}
          resizeHandler = {this.props.setScroll}
        />
        {prompt}
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    this.sendFocusRequest();
    this.props.setScroll();
  }

  sendFocusRequest() {
    if (this.prompt !== null)
      this.prompt.focus();
  }
  completeMessage(val) {
    this.props.sendCall(val);

    this.setState({
      promptVal: '',
      historyInd: 0
    })
  }
  updateMessage(val) {
    this.setState({
      promptVal: val,
      historyInd: 0
    })
  }
  historyScrollUp() {
    var newHistory = Math.min(this.state.historyInd + 1, this.props.callList.length);
    this.setState({
      promptVal: newHistory === 0 ? '' : this.props.callList[newHistory - 1],
      historyInd: newHistory
    })
  }
  historyScrollDown() {
    var newHistory = Math.max(this.state.historyInd - 1, 0);
    this.setState({
      promptVal: newHistory === 0 ? '' : this.props.callList[newHistory - 1],
      historyInd: newHistory
    })
  }
}

/**
 * Redux container
* */

function mapStateToProps(state) {
  return {
    callList: state.monitor.callList,
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
