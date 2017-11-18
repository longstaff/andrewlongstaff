import React from 'react';
import Display from '../display/Display';
import TimedButton from '../timed-button/TimedButton'

export default (props) => (
  <div>
    <Display
      count={props.totalCodeLines}
      available={props.availableCodeLines}
      quitHandler={props.quitHandler}
    />
    <TimedButton
      onClick={() => {props.addLines(1)}}
      resetSeconds={5}
    >Write Code</TimedButton>
    <TimedButton
      onClick={() => {props.spendCode(1)}}
      resetSeconds={5}
    >Spend Code</TimedButton>
  </div>
);
