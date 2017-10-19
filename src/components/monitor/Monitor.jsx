import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as MonitorActions from './MonitorActions';

export class Monitor extends Component {
  render() {
    return (
      <div onClick={this.sendFocusRequest} >
        <h1>MONITOR</h1>
        {this.props.history.map(val => (<p key={val.id}>{val.call}:{val.response}</p>))}
      </div>
    );
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.props.addCall('Call', 'Response');
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  sendFocusRequest() {
    console.log('Send Focus Request');
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
