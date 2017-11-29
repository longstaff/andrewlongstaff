import React from 'react';
import TimedButton from '../timed-button/TimedButton'

export default (props) => {
  return <div>
    <h3>Buttons</h3>
    {props.buttons.map(val => (
      <TimedButton
        key={val.id}
        onClick={val.onClick}
        resetSeconds={val.reset}
        disabled={val.disabled}
      >
        {val.title}
      </TimedButton>
    ))}
  </div>
}
