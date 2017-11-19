import React from 'react';

export default (props) => (
  <div>
    <h1>Andrew Longstaff Work Environement V1.1</h1>
    <h2>Lines of Code written: {props.count}</h2>
    <button
      onClick={props.quitHandler}
    >Back to terminal</button>
  </div>
);
