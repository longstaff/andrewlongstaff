import React, { Component } from 'react';
import Command from '../command/Command';
import './Prompt.css'

export default class Prompt extends Component {
  constructor(props) {
    super(props);
    this.testCompleteMessage = this.testCompleteMessage.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
  }

  render() {
    return (
      <div className="Prompt">
        <Command />
        <input
          className="Prompt-input"
          ref = {(input) => {this.textInput = input;}}
          type = "text"
          onKeyPress = {this.testCompleteMessage}
          onChange = {this.updateMessage}
          value = {this.props.value}
        />
      </div>
    );
  }

  focus() {
    this.textInput.focus();
  }

  testCompleteMessage(ev) {
    if (ev.key === 'Enter') {
      this.props.onComplete(ev.target.value);
      return false;
    }
  }
  updateMessage(ev) {
    this.props.onChange(ev.target.value);
  }
}
