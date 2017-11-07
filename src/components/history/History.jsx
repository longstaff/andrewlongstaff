import React, { Component } from 'react';
import Call from '../call/Call';
import Response from '../response/Response';
import './History.css';

export default class History extends Component {
  render() {
    return (
      <ol className = {`History ${this.props.prompt ? '' : 'History_no-prompt'}`}>
        {
          this.props.history.map(val => {
            let call = val.call ? <Call value = {val.call}/> : '';
            let response = val.response ? <Response
              value = {val.response}
              resizeHandler = {this.props.resizeHandler}
            /> : <Response value = "..." />

            return <li key={val.id} className="History-item">
              {call}
              {response}
            </li>
          })
        }
      </ol>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    let update = nextProps.prompt !== this.props.prompt;
    update = update || nextProps.history.length !== this.props.history.length;
    update = update || !nextProps.history.length;
    update = update || !this.props.history.length;
    update = update || nextProps.history[nextProps.history.length - 1] !== this.props.history[this.props.history.length - 1];
    return update;
  }
}
