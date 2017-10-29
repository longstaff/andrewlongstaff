import React, { Component } from 'react';
import Command from '../command/Command';
import './Prompt.css'

export default class Prompt extends Component {
  constructor(props) {
    super(props);
    this.testKey = this.testKey.bind(this);
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
          onKeyDown = {this.testKey}
          onChange = {this.updateMessage}
          value = {this.props.value}
        />
      </div>
    );
  }

  focus() {
    this.textInput.focus();
  }

  testKey(ev) {
    if (ev.key === 'Enter') {
      this.props.onComplete(ev.target.value);
      return false;
    } else if (ev.key === 'ArrowUp') {
      this.props.onHistoryScrollUp();
      ev.preventDefault();
    } else if (ev.key === 'ArrowDown') {
      this.props.onHistoryScrollDown();
      ev.preventDefault();
    }
  }
  updateMessage(ev) {
    this.props.onChange(ev.target.value);
  }
}
