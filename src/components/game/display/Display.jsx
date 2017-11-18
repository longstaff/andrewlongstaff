import React from 'react';

export default (props) => (
  <div>
    <h1>Lines of Code written: {props.count}</h1>
    <h3>Uncommitted Code: {props.available}</h3>
    <button
      onClick={props.quitHandler}
    >Back to terminal</button>
  </div>
);
